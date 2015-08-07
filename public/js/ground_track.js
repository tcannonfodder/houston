var GroundTrack = Class.create({
  initialize: function(datalink, map_id){
    this.datalink = datalink
    this.map_id = map_id
    this.initializeMap()
    this.initializeDatalink()
  },

  recalculate: function(data){
    // load data from KSP
    var eccentricity = data["o.eccentricity"] //no unit
    var trueAnomalyInDegrees = data["o.trueAnomaly"] //degrees
    var trueAnomalyInRadians = Math.toRadians(trueAnomalyInDegrees) //radians
    var gravitationalParameter = 3531600000000 // Gm/s^2
    var semiMajorAxis = data["o.sma"] //meters
    var startTime = 0 //seconds
    var endTime = 0 //seconds
    var inclinationInDegrees = data["o.inclination"] // degrees
    var inclinationInRadians = Math.toRadians(inclinationInDegrees) // radians
    var longitudeOfAscendingNodeInDegrees = data["o.lan"] //degrees
    var longitudeOfAscendingNodeInRadians = Math.toRadians(longitudeOfAscendingNodeInDegrees) //radians
    var argumentOfPeriapsisInDegrees = data["o.argumentOfPeriapsis"] //degrees
    var argumentOfPeriapsisInRadians = Math.toRadians(argumentOfPeriapsisInDegrees) //radians
    var orbitalPeriod = data["o.period"] // seconds
    var angularVelocityOfVessel = data["v.angularVelocity"] // meters/second
    var universalGravitationalParameter = 6.673999953095288e-11
    var rotationalPeriodOfKerbin = 21599.9120145401 //seconds
    var universalDateTime = data["t.universalTime"] //seconds
    var gravitationalParameter = data["b.o.gravParameter[1]"]

    // console.log("a: " + semiMajorAxis)
    // console.log("e: " + eccentricity)
    // console.log("mu: " + gravitationalParameter)
    // console.log("omega: " + longitudeOfAscendingNodeInDegrees )
    // console.log("i: " + inclinationInDegrees)
    // console.log("w: " + argumentOfPeriapsisInDegrees)

    this.actualPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, trueAnomalyInRadians)
    this.actualPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(this.actualPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)

    this.actualLatitudeInDegrees = data["v.lat"] //degrees
    this.actualLatitudeInRadians = Math.toRadians(this.actualLatitudeInDegrees) //radians

    this.actualLongitudeInDegrees = data["v.long"] //degrees
    this.actualLongitudeInRadians = Math.toRadians(this.actualLongitudeInDegrees) //radians

    this.rotationalVelocityOfKerbin = OrbitalMath.angularFrequencyOfBody(rotationalPeriodOfKerbin)
    this.GMSTInRadians = OrbitalMath.calculateGMSTInRadiansForOrigin(this.actualPositionVectorInIJK, this.actualLongitudeInRadians)

    this.estimatedLatitude = OrbitalMath.findLatitudeOfPositionUnitVector(this.actualPositionVectorInIJK)
    this.estimatedLongitude = OrbitalMath.findLongitudeOfPositonUnitVector(this.actualPositionVectorInIJK, this.rotationalVelocityOfKerbin, startTime, endTime, this.GMSTInRadians)

    var E = OrbitalMath.eccentricAnomalyFromTrueAnomalyAndEcentricity(trueAnomalyInRadians, eccentricity)
    // console.log(Math.toDegrees(E))

    function estimatePositionVectorInPQW(gravitationalParameter, semiMajorAxis, eccentricity, eccentricAnomaly){
      var vector = {}
      vector.p = semiMajorAxis * (Math.cos(eccentricAnomaly) - eccentricity)
      vector.q = semiMajorAxis * Math.sqrt(1-Math.pow(eccentricity,2)) * Math.sin(eccentricAnomaly)
      vector.w = 0
      return vector
    }

    this.orbitalPredictionCoordinates = []

    var startTime = Math.sqrt(Math.pow(semiMajorAxis,3)/gravitationalParameter) * (E - eccentricity * Math.sin(E))
    var endOfPlot = Math.toDegrees(E) + 720

    var lastLatitude = null
    var lastLongitude = null

    for(var degree = Math.toDegrees(E); degree <= endOfPlot; degree++){
      var eccentricAnomalyInRadians = Math.toRadians(degree)
      // var eccentricAnomalyInRadians = 2 * Math.atan(Math.sqrt((1-eccentricity)/(1+eccentricity)) * Math.tan(trueAnomalyInRadians/2))
      var meanMotion = eccentricAnomalyInRadians - (eccentricity * Math.sin(eccentricAnomalyInRadians))


      if(eccentricAnomalyInRadians == E){
        // console.log("E: " + Math.toDegrees(E))
        // console.log("abs(E): " + Math.abs(Math.toDegrees(E)))
        // console.log("M:" + Math.toDegrees(meanMotion))
        // console.log("E_0 : " + Math.toDegrees(eccentricAnomalyInRadians))
      }

      var estimatedTrueAnomaly = OrbitalMath.trueAnomalyFromEccentricAnomalyAndEccentricity(eccentricAnomalyInRadians, eccentricity, longitudeOfAscendingNodeInDegrees)
      // var Vx = Math.sqrt(1- eccentricity) * Math.cos(E/2)
      // var Vy = Math.sqrt(1+ eccentricity) * Math.sin(E/2)
      // var estimatedTrueAnomaly = 2 * Math.atan2(Vy,Vx)

      // if(eccentricAnomalyInRadians == E){
        // console.log("act true anomaly: " + Math.toDegrees(trueAnomalyInRadians) % 360)
        // console.log("est true anomaly: " + Math.toDegrees(estimatedTrueAnomaly) % 360)
      // }

      var endTime =  Math.sqrt(Math.pow(semiMajorAxis,3)/gravitationalParameter) * (eccentricAnomalyInRadians - eccentricity * Math.sin(eccentricAnomalyInRadians))
      // console.log("estimated Time: " + estimatedTime)


      var estimatedPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, estimatedTrueAnomaly)

      // var estimatedPositionVectorInPQW = estimatePositionVectorInPQW(gravitationalParameter, semiMajorAxis, eccentricity, eccentricAnomalyInRadians)
      var estimatedPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(estimatedPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)
      var latitudeInDegrees = Math.toDegrees(OrbitalMath.findLatitudeOfPositionUnitVector(estimatedPositionVectorInIJK))
      var longitudeInDegrees = Math.toDegrees(OrbitalMath.findLongitudeOfPositonUnitVector(estimatedPositionVectorInIJK, this.rotationalVelocityOfKerbin, startTime, endTime, this.GMSTInRadians))

      // try to correct for when the position vector switches over
      if(lastLatitude && (Math.abs(lastLatitude - latitudeInDegrees) % 360 > 100 )){
        // debugger
        latitudeInDegrees = 180 + latitudeInDegrees % 360
      }

      if(lastLongitude){
        // Handle when the difference is greater than 180
        var old = longitudeInDegrees
        var longitudeDistance = lastLongitude - longitudeInDegrees % 360
        // if(longitudeDistance > 360){
        //   longitudeInDegrees = 540 + longitudeInDegrees % 360
        // } else if(longitudeDistance > 180){
        //   longitudeInDegrees = 360 + longitudeInDegrees % 360
        if(longitudeDistance > 100){
          var revolutions =  Math.ceil(longitudeDistance/180)
          longitudeInDegrees = (revolutions  * 180) + (longitudeInDegrees % 360)
        }
      }

      if(lastLongitude && (Math.abs(lastLongitude - longitudeInDegrees) % 360 > 100 )){
        var old = longitudeInDegrees
        // longitudeInDegrees = 180 + longitudeInDegrees % 360
        if(degree >= (endOfPlot - 4)){
          // debugger
        }
        // console.log("old: " + old + " ; new: " + longitudeInDegrees)
      }

      if(Math.abs(lastLongitude - longitudeInDegrees) > 100){
        // debugger
        // console.log("act: (" + this.actualLatitudeInDegrees.toFixed(0) + "," + this.actualLongitudeInDegrees.toFixed(0) + ")")
        // console.log("est: (" + latitudeInDegrees.toFixed(0) + "," + longitudeInDegrees.toFixed(0) + ")")
      }

      // Now that we've finished correcting this current latitude and longitude, set it as the "last"
      lastLatitude = latitudeInDegrees
      lastLongitude = longitudeInDegrees

      // if(eccentricAnomalyInRadians == E){
        // console.log("Act PQW:" + JSON.stringify(this.actualPositionVectorInPQW))
        // console.log("Est PQW:" + JSON.stringify(estimatedPositionVectorInPQW))

        // console.log("Act IJK:" + JSON.stringify(this.actualPositionVectorInIJK))
        // console.log("Est IJK:" + JSON.stringify(estimatedPositionVectorInIJK))
        // console.log("act: (" + this.actualLatitudeInDegrees.toFixed(0) + "," + this.actualLongitudeInDegrees.toFixed(0) + ")")
        // console.log("est: (" + latitudeInDegrees.toFixed(0) + "," + longitudeInDegrees.toFixed(0) + ")")
        // console.log("----")
      // }

      // debugger

      // if(estimatedPositionVectorInPQW.p > 0){
      //   longitudeInDegrees = longitudeInDegrees
      // }

      // console.log("(" +latitudeInDegrees + "," + longitudeInDegrees + ")")

      this.orbitalPredictionCoordinates.push([latitudeInDegrees, longitudeInDegrees])
    }

    // console.log(JSON.stringify(this.orbitalPredictionCoordinates, null, 2))

    // debugger



    // calculate "universal" data about the orbital situation

    // this.actualPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, trueAnomalyInRadians)
    // this.actualPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(this.actualPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)

    // this.rotationalVelocityOfKerbin = OrbitalMath.angularFrequencyOfBody(rotationalPeriodOfKerbin)

    // this.GMSTInRadians = OrbitalMath.calculateGMSTInRadiansForOrigin(this.actualPositionVectorInIJK, this.actualLongitudeInRadians)
    // this.GMSTInDegrees = Math.toDegrees(this.GMSTInRadians)



    // var E = OrbitalMath.eccentricAnomalyFromTrueAnomalyAndEcentricity(trueAnomalyInRadians, eccentricity)
    // var n = OrbitalMath.angularFrequencyOfBody(orbitalPeriod)
    // var meanAnomaly = OrbitalMath.meanAnomalyFromEccentricAnomalyAndEccentricity(E, eccentricity)
    // var estimatedE = OrbitalMath.estimateEccentricAnomalyFromMeanAnomalyAndEccentricity(meanAnomaly, eccentricity)
    // var estimatedV = OrbitalMath.trueAnomalyFromEccentricAnomalyAndEccentricity(E, eccentricity)



    // this.estimatedLatitude = OrbitalMath.findLatitudeOfPositionUnitVector(this.actualPositionVectorInIJK)

    // this.estimatedLongitude = OrbitalMath.findLongitudeOfPositonUnitVector(this.actualPositionVectorInIJK, this.rotationalVelocityOfKerbin, startTime, endTime, this.GMSTInRadians)


    //var meanAnomalyAtTime1 = OrbitalMath.meanAnomalyAtTimeAndMeanMotion(n, startTime, endTime, meanAnomaly)
    //var eccentricAnomalyAtTime1 = OrbitalMath.estimateEccentricAnomalyFromMeanAnomalyAndEccentricity(meanAnomalyAtTime1, eccentricity)
    //var trueAnomalyAtTime1 = OrbitalMath.trueAnomalyFromEccentricAnomalyAndEccentricity(eccentricAnomalyAtTime1, eccentricity)

    this.updateMap()
  },

  convertCoordinatesToMap: function(latitude, longitude){
    return [latitude, longitude > 180 ? longitude - 360 : longitude]
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)
    object.setLatLng([convertedCoordinates[0], convertedCoordinates[1]])
  },

  updateMap: function(){
    this.setCoordinatesForMapObject(this.markers.actualCoordinates, this.actualLatitudeInDegrees, this.actualLongitudeInDegrees)
    this.setCoordinatesForMapObject(this.markers.convertedActualCoordinates, Math.toDegrees(this.estimatedLatitude), Math.toDegrees(this.estimatedLongitude))

    for (var i = this.markers.orbitalPaths.length - 1; i >= 0; i--) {
      this.markers.orbitalPaths[i].setLatLngs([])
    };

    var orbitalPredictionSets = []

    var previousCoordinates = null
    for (var i = 0 ; i < this.orbitalPredictionCoordinates.length; i++) {
      var coordinates = this.orbitalPredictionCoordinates[i]
      var latitude = coordinates[0]
      var longitude = coordinates[1]

      //If the current coordinate's longitude is greater than 180, then it will be wrapped.
      //Therefore, make it the start of a new orbital path set
      if(previousCoordinates && longitude > 180 && !(previousCoordinates[1] > 180)){
        currentOrbitalPathSet = null
      }

      previousCoordinates = coordinates

      var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)

      if(currentOrbitalPathSet == null){
        var currentOrbitalPathSet = []
        orbitalPredictionSets.push(currentOrbitalPathSet)
      }

      currentOrbitalPathSet.push(convertedCoordinates)
    }

    for (var i = 0; i < orbitalPredictionSets.length; i++) {
      var coordinateSet = orbitalPredictionSets[i]
      if(!this.markers.orbitalPaths[i]){
        this.markers.orbitalPaths[i] = L.polyline([], {color: 'red'})
        this.markers.orbitalPaths[i].addTo(this.map)
      }

      this.markers.orbitalPaths[i].setLatLngs(coordinateSet)
    };

    var estimatedCoordinates = this.orbitalPredictionCoordinates[0]
    this.setCoordinatesForMapObject(this.markers.estimatedCoordinates, estimatedCoordinates[0], estimatedCoordinates[1])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.trueAnomaly', 'o.sma', 'o.maae', 'o.eccentricity',
      'o.inclination', 'o.lan', 'o.argumentOfPeriapsis', 'v.lat', 'v.long',
      'o.period', 'v.angularVelocity', 't.universalTime', "b.o.gravParameter[1]"
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.map_id, {
      layers: [L.KSP.CelestialBody.KERBIN],
      zoom: L.KSP.CelestialBody.KERBIN.defaultLayer.options.maxZoom,
      center: [-0.1027, -74.5754],
      bodyControl: false,
      layerControl: true,
      scaleControl: true
    })

    this.map.fitWorld()

    L.graticule().addTo(this.map)

    var estimationIcon = L.icon({
      iconUrl: 'markers-anomaly.png',
      shadowUrl: 'marker-shadow.png',
      iconSize:     [25, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor:  [-1, -34] // point from which the popup should open relative to the iconAnchor
    })

    var conversionIcon = L.icon({
      iconUrl: 'markers-spacecenter.png',
      shadowUrl: 'marker-shadow.png',
      iconSize:     [25, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor:  [-1, -34] // point from which the popup should open relative to the iconAnchor
    })


    this.markers = {
      actualCoordinates : L.marker([0, 0]),
      estimatedCoordinates : L.marker([0,0], {icon: estimationIcon}),
      convertedActualCoordinates : L.marker([0,0], {icon: conversionIcon}),
      orbitalPaths : []
    }

    this.markers.actualCoordinates.addTo(this.map)
    this.markers.estimatedCoordinates.addTo(this.map)
    this.markers.convertedActualCoordinates.addTo(this.map)
  }
})