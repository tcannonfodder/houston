var OrbitalPrediction = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink
    this.currentBody = null
    this.initializeDatalink()
    this.options = Object.extend({
      onRecalculate: null,
      predictionLength: 720
    }, options)
  },

  recalculate: function(data){
    //If we haven't found the body yet, then we we need to get the info and recalculate
    //on the next update
    if(this.currentBody == null || this.currentBody.name != data['v.body']){
      this.subscribeToBodyData(data)
      return
    }

    // START: load data from KSP

    //universal info
    var universalDateTime = data["t.universalTime"] //seconds

    // body info
    var gravitationalParameter = data['b.o.gravParameter[' + this.currentBody.id + ']'] // Gm/s^2
    var rotationalPeriodOfBody = data['b.rotationPeriod[' + this.currentBody.id + ']'] //seconds

    //orbit info
    var eccentricity = data["o.eccentricity"] //no unit
    var trueAnomalyInDegrees = data["o.trueAnomaly"] //degrees
    var trueAnomalyInRadians = Math.toRadians(trueAnomalyInDegrees) //radians
    var semiMajorAxis = data["o.sma"] //meters
    var inclinationInDegrees = data["o.inclination"] // degrees
    var inclinationInRadians = Math.toRadians(inclinationInDegrees) // radians
    var longitudeOfAscendingNodeInDegrees = data["o.lan"] //degrees
    var longitudeOfAscendingNodeInRadians = Math.toRadians(longitudeOfAscendingNodeInDegrees) //radians
    var argumentOfPeriapsisInDegrees = data["o.argumentOfPeriapsis"] //degrees
    var argumentOfPeriapsisInRadians = Math.toRadians(argumentOfPeriapsisInDegrees) //radians
    var orbitalPeriod = data["o.period"] // seconds

    //  Vessel info
    var angularVelocityOfVessel = data["v.angularVelocity"] // meters/second

    // END: Load data from KSP

    this.startTime = 0 //seconds
    var endTime = 0 //seconds

    //Calculate some basic info about the current orbit


    this.actualPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, trueAnomalyInRadians)
    this.actualPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(this.actualPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)

    this.actualLatitudeInDegrees = data["v.lat"] //degrees
    this.actualLatitudeInRadians = Math.toRadians(this.actualLatitudeInDegrees) //radians

    this.actualLongitudeInDegrees = data["v.long"] //degrees
    this.actualLongitudeInRadians = Math.toRadians(this.actualLongitudeInDegrees) //radians

    this.rotationalVelocityOfBody = OrbitalMath.angularFrequencyOfBody(rotationalPeriodOfBody)
    this.GMSTInRadians = OrbitalMath.calculateGMSTInRadiansForOrigin(this.actualPositionVectorInIJK, this.actualLongitudeInRadians)

    this.estimatedLatitude = OrbitalMath.findLatitudeOfPositionUnitVector(this.actualPositionVectorInIJK)
    this.estimatedLongitude = OrbitalMath.findLongitudeOfPositonUnitVector(this.actualPositionVectorInIJK, this.rotationalVelocityOfBody, this.startTime, endTime, this.GMSTInRadians)

    var E = OrbitalMath.eccentricAnomalyFromTrueAnomalyAndEcentricity(trueAnomalyInRadians, eccentricity)

    this.orbitalPredictionValues = []

    this.startTime = Math.sqrt(Math.pow(semiMajorAxis,3)/gravitationalParameter) * (E - eccentricity * Math.sin(E))
    var endOfPlot = Math.toDegrees(E) + this.options.predictionLength

    var lastLatitude = null
    var lastLongitude = null

    for(var degree = Math.toDegrees(E); degree <= endOfPlot; degree++){
      var eccentricAnomalyInRadians = Math.toRadians(degree)
      var meanMotion = eccentricAnomalyInRadians - (eccentricity * Math.sin(eccentricAnomalyInRadians))

      var estimatedTrueAnomaly = OrbitalMath.trueAnomalyFromEccentricAnomalyAndEccentricity(eccentricAnomalyInRadians, eccentricity, longitudeOfAscendingNodeInDegrees)

      var endTime =  Math.sqrt(Math.pow(semiMajorAxis,3)/gravitationalParameter) * (eccentricAnomalyInRadians - eccentricity * Math.sin(eccentricAnomalyInRadians))


      var estimatedPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, estimatedTrueAnomaly)

      var estimatedPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(estimatedPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)
      var latitudeInDegrees = Math.toDegrees(OrbitalMath.findLatitudeOfPositionUnitVector(estimatedPositionVectorInIJK))
      var longitudeInDegrees = Math.toDegrees(OrbitalMath.findLongitudeOfPositonUnitVector(estimatedPositionVectorInIJK, this.rotationalVelocityOfBody, this.startTime, endTime, this.GMSTInRadians))
      var altitude = Math.sqrt(Math.pow(estimatedPositionVectorInPQW.p,2) + Math.pow(estimatedPositionVectorInPQW.q,2) + Math.pow(estimatedPositionVectorInPQW.w,2))


      // try to correct for when the position vector switches over
      if(lastLatitude && (Math.abs(lastLatitude - latitudeInDegrees) % 360 > 100 )){
        latitudeInDegrees = 180 + latitudeInDegrees % 360
      }

      if(lastLongitude){
        // Handle when the difference is greater than 180
        var old = longitudeInDegrees
        var longitudeDistance = lastLongitude - longitudeInDegrees % 360
        if(longitudeDistance > 100){
          var revolutions =  Math.ceil(longitudeDistance/180)
          longitudeInDegrees = (revolutions  * 180) + (longitudeInDegrees % 360)
        }
      }

      // Now that we've finished correcting this current latitude and longitude, set it as the "last"
      lastLatitude = latitudeInDegrees
      lastLongitude = longitudeInDegrees

      this.orbitalPredictionValues.push({
        altitude: altitude,
        latitude: latitudeInDegrees,
        longitude: longitudeInDegrees,
        time: endTime
      })
    }

    //Now that the recalculation has finished, its time for the callback
    this.options.onRecalculate && this.options.onRecalculate(this)
  },

  subscribeToBodyData: function(data){
    this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    this.datalink.subscribeToData([
      'b.o.gravParameter[' + this.currentBody.id + ']',
      'b.rotationPeriod[' + this.currentBody.id + ']'
    ])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.trueAnomaly', 'o.sma', 'o.maae', 'o.eccentricity',
      'o.inclination', 'o.lan', 'o.argumentOfPeriapsis', 'v.lat', 'v.long',
      'o.period', 'v.angularVelocity', 't.universalTime', 'v.body', 'v.altitude'
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },
})