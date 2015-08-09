var OrbitalMath = {
  partsOfUniversalDateTime: function(time){
    var parts = {}
    if (time == null) {
      time = 0;
    }
    parts.year = ((time / (365 * 24 * 3600)) | 0) + 1;
    time %= 365 * 24 * 3600;
    parts.day = ((time / (24 * 3600)) | 0) + 1;
    time %= 24 * 3600;
    parts.universalTime = time

    parts.hour = (time / 3600) | 0;
    time %= 3600;
    parts.minutes = (time / 60) | 0;
    parts.seconds = (time % 60 | 0).toFixed();

    return parts
  },

  calculateGMSTInDegrees: function(universalDateTime){
    var timeParts = partsOfUniversalDateTime(universalDateTime)
    var G = 6.697374558
    var dayFactor = 0.06570982441908
    var timeFactor = 1.00273790935
    return G + (dayFactor * timeParts.day) + (timeFactor * timeParts.hour)
  },

  eccentricAnomalyFromTrueAnomalyAndEcentricity: function(trueAnomaly, eccentricity){
    return 2 * Math.atan(Math.sqrt((1-eccentricity)/(1+eccentricity)) * Math.tan(trueAnomaly/2))
  },

  meanMotionFromGravitationalParametersAndSemimajorAxis: function(gravitationalParameter, semiMajorAxis, orbitalPeriod){
    // console.log("mu : " + gravitationalParameter + " SMA : " + semiMajorAxis)
    // return orbitalPeriod * Math.sqrt(gravitationalParameter/(4 * Math.pow(Math.PI, 2) * Math.pow(semiMajorAxis, 3)))
    return Math.sqrt(gravitationalParameter/Math.pow(semiMajorAxis, 3))
  },

  meanAnomalyFromEccentricAnomalyAndEccentricity: function(eccentricAnomaly, eccentricity){
    return eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly)
  },

  meanAnomalyAtTimeAndMeanMotion: function(meanMotion, startTime, endTime, originalMeanAnomaly){
    var deltaT = endTime - startTime
    return originalMeanAnomaly + meanMotion * deltaT
  },

  estimateEccentricAnomalyFromMeanAnomalyAndEccentricity: function(meanAnomaly, eccentricity){
    var error = 100
    var eccentricAnomaly1 = meanAnomaly

    while(error > 0.00000000001){
      var newEccentricAnomaly = meanAnomaly + (eccentricity * Math.sin(eccentricAnomaly1))
      error = Math.abs(newEccentricAnomaly - eccentricAnomaly1)
      eccentricAnomaly1 = newEccentricAnomaly
    }
    return eccentricAnomaly1
  },

  trueAnomalyFromEccentricAnomalyAndEccentricity: function(eccentricAnomaly, eccentricity, meanAnomaly){
    // var factor1 = Math.sqrt(1.0 - Math.pow(eccentricity, 2)) * Math.sin(eccentricAnomaly)
    // var factor2 = 1 - eccentricity * Math.cos(eccentricAnomaly)

    // if(longitudeOfAscendingNodeInDegrees > 90 && longitudeOfAscendingNodeInDegrees <= 360){
    //   var inversion = Math.toRadians(360)
    // } else{
      // var inversion = 0
    // }

    var x = Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomaly/2)
    var y = Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomaly/2)

    return 2 * Math.atan2(y,x)

    // return Math.asin(factor1/factor2)
  },

  findSemiLatusRectum: function(semiMajorAxis, eccentricity){
    // var x = semiMajorAxis * (1 - Math.pow(eccentricity, 2))
    // console.log("semi latus rectum: " + x)

    var apoapsis = 320565.458678732
    var periapsis = 102454.341836878

    return (2 * apoapsis * periapsis ) / (apoapsis + periapsis)
    // return x
  },

  findPolarEquationOfConic: function(semiMajorAxis, eccentricity, trueAnomaly){
    var p = this.findSemiLatusRectum(semiMajorAxis, eccentricity)
    // console.log("p: " + p)
    // console.log("factor: " + (1 + eccentricity * Math.cos(trueAnomaly)))
    return p/(1 + eccentricity * Math.cos(trueAnomaly))
  },

  positionVectorInPQWFrame: function(semiMajorAxis, eccentricity, trueAnomaly){
    var r = this.findPolarEquationOfConic(semiMajorAxis, eccentricity, trueAnomaly)
    var vector = {}
    vector.p = r * Math.cos(trueAnomaly)
    vector.q = r * Math.sin(trueAnomaly)
    vector.w = 0
    // console.log("trueAnomaly: " + trueAnomaly)
    // console.log("r: " + r)
    // console.log(JSON.stringify(vector))
    // debugger
    return vector
  },

  velocityVectorInPQWFrame: function(semiMajorAxis, eccentricity, trueAnomaly, gravitationalParameter){
    var p = findSemiLatusRectum(semiMajorAxis, eccentricity)
    var factor = Math.sqrt(gravitationalParameter/p)
    var vector = {}
    vector.p = -Math.sin(trueAnomaly)
    vector.q = eccentricity + Math.cos(trueAnomaly)
    vector.w = 0
    return vector
  },

  transformVector: function(matrix, vector){
    var vectorKeys = Object.keys(vector)
    var newVector = {}
    //iterate through the rows of the matrix
    for (var i = 0; i < matrix.length; i++) {
      var row = matrix[i]
      var derivativeVector = vectorKeys[i]
      //iterate through the columns
      for (var j = 0; j < vectorKeys.length; j++) {
        var currentKey = vectorKeys[j]
        if(!newVector[derivativeVector]){ newVector[derivativeVector] = 0 }
        newVector[derivativeVector] += vector[currentKey] * row[j]
      }
    }
    return newVector
  },

  // Thank god for: https://en.wikipedia.org/wiki/Perifocal_coordinate_system
  transformPositionPQWVectorToIJKFrame: function(vector, inclination, longitudeOfAscendingNode, argumentOfPeriapsis){
    var vectorIJK = {}
    var omega = longitudeOfAscendingNode
    var w = argumentOfPeriapsis
    var i = inclination

    //Column, row order. First level is columns, each column has N rows
    var transformationMatrix = [
      [
        // 1 1
        Math.cos(omega) * Math.cos(w) - Math.sin(omega) * Math.sin(w) * Math.cos(i),
        // 1 2
        -Math.cos(omega) * Math.sin(w) - Math.sin(omega)* Math.cos(w) * Math.cos(i),
        // 1 2
        Math.sin(omega) * Math.sin(i)
      ],
      [
        // 2 1
        Math.sin(omega) * Math.cos(w) + Math.cos(omega) * Math.sin(w) * Math.cos(i),
        // 2 2
        -Math.sin(omega) * Math.sin(w) + Math.cos(omega) * Math.cos(w) * Math.cos(i),
        // 2 3
        -Math.cos(omega) * Math.sin(i),
      ],
      [
        // 3 1
        Math.sin(w) * Math.sin(i),
        // 3 2
        Math.cos(w) * Math.sin(i),
        // 3 3
        Math.cos(i)
      ]
    ]

    var transformedPQW = this.transformVector(transformationMatrix, vector)
    vectorIJK.i = transformedPQW.p
    vectorIJK.j = transformedPQW.q
    vectorIJK.k = transformedPQW.w

    // debugger

    return vectorIJK
  },

  findLatitudeOfPositionUnitVector: function(vector){
    var x = Math.sqrt(Math.pow(vector.i, 2) + Math.pow(vector.j, 2))
    var z = vector.k

    return Math.atan(z/x)
  },

  angularFrequencyOfBody: function(period){
    return (2 * Math.PI)/period
  },

  calculateGMSTInRadiansForOrigin: function(vector, longitude){
    var theta = Math.atan(vector.j/vector.i)
    return theta - longitude
  },

  findLongitudeOfPositonUnitVector: function(vector, angularVelocityOfPlanet, startTime, endTime, GMSTInRadians){
    var deltaT = endTime - startTime
    var quadrant = vector.j > 0 ? 1 : -1
    var theta = Math.atan(vector.j/vector.i)
    // debugger
    return theta - GMSTInRadians - (angularVelocityOfPlanet * deltaT)
  }
}