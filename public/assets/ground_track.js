var GroundTrack = Class.create({
  initialize: function(datalink, map_id, altitudeEstimationId){
    this.datalink = datalink
    this.map_id = map_id
    this.altitudeEstimationId = altitudeEstimationId
    this.initializeAltitudeEstimate()
    this.initializeMap()

    this.orbitalPrediction = new OrbitalPrediction(this.datalink, {
      onRecalculate: this.drawOrbitalPrediction.bind(this)
    })
  },

  drawOrbitalPrediction: function(orbitalPrediction){
    for (var i = this.markers.orbitalPaths.length - 1; i >= 0; i--) {
      this.markers.orbitalPaths[i].setLatLngs([])
    };

    var orbitalPredictionSets = []

    var previousOrbitalPredictionValue = null
    for (var i = 0 ; i < orbitalPrediction.orbitalPredictionValues.length; (10 * i++)) {
      var orbitalPredictionValue = orbitalPrediction.orbitalPredictionValues[i]
      var latitude = orbitalPredictionValue.latitude
      var longitude = orbitalPredictionValue.longitude

      //If the current coordinate's longitude is greater than 180, then it will be wrapped.
      //Therefore, make it the start of a new orbital path set
      if(previousOrbitalPredictionValue && longitude > 180 && !(previousOrbitalPredictionValue.longitude > 180)){
        currentOrbitalPathSet = null
      }

      previousOrbitalPredictionValue = orbitalPredictionValue

      var convertedCoordinates = this.positionMap.convertCoordinatesToMap(latitude, longitude)

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
        this.markers.orbitalPaths[i].addTo(this.positionMap.map)
      }

      this.markers.orbitalPaths[i].setLatLngs(coordinateSet)
    };

    var estimatedCoordinates = orbitalPrediction.orbitalPredictionValues[0]
    this.positionMap.setCoordinatesForMapObject(this.markers.estimatedCoordinates, estimatedCoordinates.latitude, estimatedCoordinates.longitude)

    this.updateAltitudeEstimateChart()
  },

  updateAltitudeEstimateChart: function(){
    var chartData = {labels: [], series: [[]]}
    var interval = 60 * 5 //seconds based
    var intervalsCovered = {}

    for (var i = 0 ; i < this.orbitalPrediction.orbitalPredictionValues.length; (interval * i++)) {
      var orbitalPredictionValue = this.orbitalPrediction.orbitalPredictionValues[i]
      var deltaT = orbitalPredictionValue.time - this.orbitalPrediction.startTime

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

    window.requestAnimationFrame(function(){
      this.altitudeEstimateChart.update(chartData)
    }.bind(this))
  },

  initializeMap: function(){
    this.positionMap = new PositionMap(this.datalink, this.map_id, {
      lockOnVessel: false
    })

    var circleMarkerOptions = {
      // fill: false,
      color: '#FD7E23',
      opacity: 1.0,
      fillOpacity: 1.0,
      radius: 5
    }

    this.markers = {
      estimatedCoordinates : L.circleMarker([0,0], circleMarkerOptions),
      orbitalPaths : []
    }

    this.markers.estimatedCoordinates.addTo(this.positionMap.map)
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