// Based on https://github.com/voneiden/ksp-missioncontrol/blob/master/client/kepler.py


var Orbit = Class.create({
  initialize: function(parent, currentTimePositionAndVelocity){
    this.parent = parent
    this.mu = this.parent.mu

    this.recalculateFromCurrentTimePositionAndVelocity(currentTimePositionAndVelocity)
  },

  recalculateFromCurrentOrbitalElements: function(currentOrbitalElements){
    this.time0 = currentOrbitalElements.time
    this.r0 = currentOrbitalElements.positionVector
    this.v0 = currentOrbitalElements.velocityVector

    this.r0l = numeric.norm2(this.positionVector0)
    this.v0l = numeric.norm2(this.velocityVector0)

    console.log("Initializing..")
    console.log("mu: " + this.mu)
    console.log("r0: " + str(this.r0))
    console.log("v0: " + str(this.v0))
    console.log("t0: " + str(this.t0))

    this.xi = Math.pow(this.v0l,2) / 2.0 - this.mu / this.r0l

    console.log("xi: " + this.xi)

    if(this.xi == 0){
      this.a = Infinity
      this.alpha = 1.0
    } else{
      // Semi-major axis
      this.a = -this.mu / (2 * this.xi)

      if(this.a == NaN){
        console.log("Error with SMA")
        console.log(" -> Position:" + this.r0)
        console.log(" -> Velocity:" + this.v0)
      }

      this.alpha = 1.0 / this.a
    }

    //Angular momentum vector and normalized version
    this.h = Math.crossProduct(this.r0, this.v0)
    this.h1 = numeric.norm2(this.h)

    // p is the semi-parameter
    this.p == Math.pow(this.h1, 2) / this.mu

    console.log("p: " + this.p)
    console.log("a: " + this.a)

    if(Math.abs(this.p - this.a) < 1e-5){
      this.e = 0
    } else{
      this.e = Math.sqrt(1 - this.p/this.a)
    }

    if(this.a){
      this.periapsis = (1 - this.e) * this.a
      this.apoapsis = (1 + this.e) * this.a
    } else{
      this.periapsis = Math.pow(this.h1,2) / this.mu
      this.apoapsis = NaN
    }

    console.log("Semi-major: "+ this.a)
    console.log("Eccentricity: "+ this.e)
    console.log("Apoapsis: "+ this.apoapsis)
    console.log("Periapsis: "+ this.periapsis)

    // Dot product of position and velocity
    this.rvdot = numeric.dot(this.r0, this.v0)
  },

  // Get the 3D position and velocity vectors at time t
  get: function(t){
    var dt = t - this.t0

    if(dt == 0){
      return [this.r0, this.v0]
    }

    // Create an initial X variable guess for:

    // Elliptical or circular orbits
    if(this.e < 1){
      var X0 = Math.sqrt(this.mu) * dt * this.alpha
    }
    //Hyperbolic orbts
    else if(this.e > 1){
      var sdt = Math.sign(dt)

      if(sdt == 0){
        sdt = 1
      }

      console.log("dt: " + dt)
      console.log("a: " + this.a)

      var X0 = sdt * Math.sqrt(-this.a) * Math.log((-2*this.mu*this.alpha*dt) / (this.rvdot * sdt * Math.sqrt(-this.mu * this.a) * (1- this.r0l * this.alpha)))
    } else{
      console.log("Error, ALPHA")
    }

    var Xnew = X0

    // Loop until we get an accurate (tolerance 1e-6) value for X
    // the loop can hang especially on near-parabolic orbits
    // changing the time a little (microseconds or so) can help achieve stable results
    var maxiter = 100
    var i = 0
    var xnews = []

    while(true){
      var psi = Math.pow(Xnew, 2) * this.alpha
      var c2Andc3 = this.findC2C3(psi)
      var c2 = c2Andc3[0]
      var c3 = c2Andc3[1]

      var r = Math.pow(Xnew,2) * c2 + self.rvdot / Math.sqrt(this.mu) * Xnew * (1 - psi * c3) + this.r0l * (1 - psi * c2)

      Xold = Xnew
      Xnew = Xold + (Math.sqrt(this.mu)*dt - Math.pow(Xold, 3) * c3 - this.rvdot / Math.sqrt(this.mu) * Math.pow(Xold, 2) * c2 - this.r0l * Xold * (1 - psi * c3)) / r

      if(abs(Xnew - Xold) < 1e-6){
        break
      }

      xnews.push(Xnew)
      i += 1

      if(i > maxiter){
        return self.get(t+0.000001)
      }
    }

    var f = 1 - Math.pow(Xnew, 2)/this.r0l * c2
    var g = dt - Math.pow(Xnew, 3)/Math.sqrt(this.mu) * c3
    var gd = 1 - Math.pow(Xnew, 2)/r * c2
    var fd = Math.sqrt(this.mu) / (r * this.r0l) * Xnew * (psi * c3 - 1)

    var R = f * this.r0 + g * this.v0
    var V = fd * this.r0 + gd * this.v0

    return [R,V]
  },

  //finds the helper variables c2 and c3, given psi
  findC2C3: function(psi){
    if(psi > 1e-20){
      var sqrtpsi = Math.sqrt(psi)
      var c2 = (1-Math.cos(sqrtpsi))/psi
      var c3 = (sqrtpsi - Math.sin(sqrtpsi))/Math.sqrt(Math.pow(psi, 3))
    } else{
      if(psi < -1e-20){
        var sqrtpsi = Math.sqrt(-psi)
        var c2 = (1-Math.cosh(sqrtpsi))/psi
        var c3 = (Math.sinh(sqrtpsi) - sqrtpsi)/Math.sqrt(Math.pow(-psi, 3))
      } else{
        var c2 = 0.5
        var c3 = 1.0/6.0
      }
    }

    return [c2, c3]
  },

  rotateZ: function(vector, angle){
    var rot_matrix = [[Math.cos(angle), Math.sin(angle), 0], [-Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]]
    return numeric.dot(vector,rot_matrix)
  },

  /*
    get the ground position, given t.
    currently supports only Kerbin
             float            float
    returns [right ascension, declination]
             longitude        latitude
  */
  getGround: function(t){
    // Get the current 3d position
    var r = this.get(t)[0]

    // Calculate the theta (planet rotation)
    var theta = this.parent.angularVelocity * t

    //create a rotation matrix and rotate the current position
    var rot_matrix = [[Math.cos(theta), Math.sin(theta), 0], [-Math.sin(theta), Math.cos(theta), 0], [0, 0, 1]]
    var rr = numeric.dot(r, rot_matrix)
    var ur = rr/numeric.norm(rr)

    // solve declination (latitude)
    var declination = Math.asin(ur[2])

    // solve the right ascension (longitude)
    if(ur[1] > 0){
      var rasc = -Math.acos(ur[0]/Math.cos(declination))
    } else if (ur <= 1){
      var rasc = Math.acos(ur[0]/Math.cos(declination))
    }

    // convert the data to degrees
    var declinationInDegrees = Math.toDegrees(declination)
    var rightAscensionInDegrees = Math.toDegrees(rasc)

    var r1 = numeric.norm(r)
    if(r1 < self.parent.radius){
      var below_radius = true
    } else{
      var below_radius = false
    }

    return [rasc,declination,below_radius]
  },

  //get the period of the orbit
  getPeriod: function(){
    if(this.a > 0){
      return Math.PI * 2 * Math.sqrt(Math.pow(this.a, 3)/this.mu)
    } else{
      return 0
    }
  },

  rotationMatrix: function(axis, angle){
    var cos_angle = Math.cos(angle)
    var cos_anle_one = 1 - cos_angle
    var sin_angle = Math.sin(angle)
    var x = axis[0]
    var y = axis[1]
    var z = axis[2]

    ri1 = cos_angle + Math.pow(x,2) * cos_angle_one
    ri2 = x * y * cos_angle_one - z * sin_angle
    ri3 = x * z * cos_angle_one + y * sin_angle

    rj1 = y * x * cos_angle_one + z * sin_angle
    rj2 = cos_angle + Math.pow(y,2) * cos_angle_one
    rj3 = y * z * cos_angle_one - x * sin_angle

    rk1 = z * x * cos_angle_one - y * sin_angle
    rk2 = z * y * cos_angle_one + x * sin_angle
    rk3 = cos_angle + Math.pow(z,2) * cos_angle_one

    return array([[ri1, ri2, ri3], [rj1, rj2, rj3], [rk1, rk2, rk3]])
  }
})