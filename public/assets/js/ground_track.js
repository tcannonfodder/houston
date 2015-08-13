var GroundTrack = Class.create({
  initialize: function(datalink, map_id, altitudeEstimationId, options){
    this.datalink = datalink
    this.map_id = map_id
    this.altitudeEstimationId = altitudeEstimationId
    if(this.altitudeEstimationId){
      this.initializeAltitudeEstimate()
    }
    this.options = Object.extend({
      centerOnVehicle: false
    }, options)
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
    this.startTime = 0 //seconds
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

    this.actualPositionVectorInPQW = OrbitalMath.positionVectorInPQWFrame(semiMajorAxis, eccentricity, trueAnomalyInRadians)
    this.actualPositionVectorInIJK = OrbitalMath.transformPositionPQWVectorToIJKFrame(this.actualPositionVectorInPQW, inclinationInRadians, longitudeOfAscendingNodeInRadians, argumentOfPeriapsisInRadians)

    this.actualLatitudeInDegrees = data["v.lat"] //degrees
    this.actualLatitudeInRadians = Math.toRadians(this.actualLatitudeInDegrees) //radians

    this.actualLongitudeInDegrees = data["v.long"] //degrees
    this.actualLongitudeInRadians = Math.toRadians(this.actualLongitudeInDegrees) //radians

    this.rotationalVelocityOfKerbin = OrbitalMath.angularFrequencyOfBody(rotationalPeriodOfKerbin)
    this.GMSTInRadians = OrbitalMath.calculateGMSTInRadiansForOrigin(this.actualPositionVectorInIJK, this.actualLongitudeInRadians)

    this.estimatedLatitude = OrbitalMath.findLatitudeOfPositionUnitVector(this.actualPositionVectorInIJK)
    this.estimatedLongitude = OrbitalMath.findLongitudeOfPositonUnitVector(this.actualPositionVectorInIJK, this.rotationalVelocityOfKerbin, this.startTime, endTime, this.GMSTInRadians)

    var E = OrbitalMath.eccentricAnomalyFromTrueAnomalyAndEcentricity(trueAnomalyInRadians, eccentricity)

    this.orbitalPredictionValues = []

    this.startTime = Math.sqrt(Math.pow(semiMajorAxis,3)/gravitationalParameter) * (E - eccentricity * Math.sin(E))
    var endOfPlot = Math.toDegrees(E) + 720

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
      var longitudeInDegrees = Math.toDegrees(OrbitalMath.findLongitudeOfPositonUnitVector(estimatedPositionVectorInIJK, this.rotationalVelocityOfKerbin, this.startTime, endTime, this.GMSTInRadians))
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

    this.updateMap()
    if(this.altitudeEstimateChart){
      this.updateAltitudeEstimateChart()
    }
  },

  convertCoordinatesToMap: function(latitude, longitude){
    return [latitude, longitude > 180 ? longitude - 180 : longitude]
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)
    object.setLatLng([convertedCoordinates[0], convertedCoordinates[1]])
  },

  updateMap: function(){
    this.setCoordinatesForMapObject(this.markers.actualCoordinates, this.actualLatitudeInDegrees, this.actualLongitudeInDegrees)
    this.setCoordinatesForMapObject(this.markers.convertedActualCoordinates, Math.toDegrees(this.estimatedLatitude), Math.toDegrees(this.estimatedLongitude))

    if(this.options.centerOnVehicle){
      this.map.setView(this.convertCoordinatesToMap(this.actualLatitudeInDegrees, this.actualLongitudeInDegrees))
    }

    for (var i = this.markers.orbitalPaths.length - 1; i >= 0; i--) {
      this.markers.orbitalPaths[i].setLatLngs([])
    };

    var orbitalPredictionSets = []

    var previousOrbitalPredictionValue = null
    for (var i = 0 ; i < this.orbitalPredictionValues.length; (10 * i++)) {
      var orbitalPredictionValue = this.orbitalPredictionValues[i]
      var latitude = orbitalPredictionValue.latitude
      var longitude = orbitalPredictionValue.longitude

      //If the current coordinate's longitude is greater than 180, then it will be wrapped.
      //Therefore, make it the start of a new orbital path set
      if(previousOrbitalPredictionValue && longitude > 180 && !(previousOrbitalPredictionValue.longitude > 180)){
        currentOrbitalPathSet = null
      }

      previousOrbitalPredictionValue = orbitalPredictionValue

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
        this.markers.orbitalPaths[i] = L.polyline([], {color: '#F5A623'})
        this.markers.orbitalPaths[i].addTo(this.map)
      }

      this.markers.orbitalPaths[i].setLatLngs(coordinateSet)
    };

    var estimatedCoordinates = this.orbitalPredictionValues[0]
    this.setCoordinatesForMapObject(this.markers.estimatedCoordinates, estimatedCoordinates.latitude, estimatedCoordinates.longitude)
  },

  updateAltitudeEstimateChart: function(){
    var chartData = {labels: [], series: [[]]}
    var interval = 60 * 5 //seconds based
    var intervalsCovered = {}

    for (var i = 0 ; i < this.orbitalPredictionValues.length; (interval * i++)) {
      var orbitalPredictionValue = this.orbitalPredictionValues[i]
      var deltaT = orbitalPredictionValue.time - this.startTime

      var intervalPeriod = Math.floor(deltaT/interval)

      if(!intervalsCovered[intervalPeriod]){
        if(intervalPeriod != 0){
          var label = "-" + TimeFormatters.durationString(deltaT.toFixed(0))
        } else{
          var label = ""
        }

        chartData.labels.push(label)
        chartData.series[0].push(orbitalPredictionValue.altitude)
        intervalsCovered[intervalPeriod] = true
      }
    }

    this.altitudeEstimateChart.update(chartData)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.trueAnomaly', 'o.sma', 'o.maae', 'o.eccentricity',
      'o.inclination', 'o.lan', 'o.argumentOfPeriapsis', 'v.lat', 'v.long',
      'o.period', 'v.angularVelocity', 't.universalTime', "b.o.gravParameter[1]",
      'v.altitude', 'o.PeA'
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.map_id, {
      layers: [L.KSP.CelestialBody.KERBIN],
      zoom: 'fit',
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

    var circleMarkerOptions = {
      // fill: false,
      color: '#FD7E23',
      opacity: 1.0,
      fillOpacity: 1.0,
      radius: 5
    }

    this.markers = {
      actualCoordinates : L.circleMarker([0, 0], circleMarkerOptions),
      estimatedCoordinates : L.circleMarker([0,0], circleMarkerOptions),
      convertedActualCoordinates : L.circleMarker([0,0], circleMarkerOptions),
      orbitalPaths : []
    }

    this.markers.actualCoordinates.addTo(this.map)
    this.markers.estimatedCoordinates.addTo(this.map)
    this.markers.convertedActualCoordinates.addTo(this.map)
  },

  initializeAltitudeEstimate: function(){
    var data = {
      // A labels array that can contain any sort of values
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [5, 2, 4, 2, 0]
      ]
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    this.altitudeEstimateChart = new Chartist.Line("#" + this.altitudeEstimationId, data);
  }
})