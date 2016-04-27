var NewGroundTrack = Class.create({
  initialize: function(datalink, positionDataFormatter, map_id, altitudeEstimationId){
    this.datalink = datalink
    this.positionDataFormatter = positionDataFormatter
    this.map_id = map_id
    this.altitudeEstimationId = altitudeEstimationId

    this.vesselColor = '#F5A623'
    this.vesselSuborbitalColor = 'red'
    this.targetColor = '#987cf9'
    this.targetSuborbitalColor = '#f97292'

    this.initializeAltitudeEstimate()
    this.initializeMap()

    this.positionDataFormatter.options.onFormat = this.render.bind(this)
  },

  render: function(formattedData){
    this.renderVesselCurrentCoordinates(formattedData)
    this.renderTargetCurrentCoordinates(formattedData)
    this.renderVesselOrbitPaths(formattedData)
    this.renderTargetOrbitPaths(formattedData)
  },

  renderVesselCurrentCoordinates: function(formattedData){
    var coordinates = formattedData.vesselCurrentCoordinates
    if(!coordinates){return}
    this.positionMap.setCoordinatesForMapObject(this.markers.vesselCoordinates, coordinates[0], coordinates[1])
  },

  renderTargetCurrentCoordinates: function(formattedData){
    var coordinates = formattedData.targetCurrentCoordinates
    if(!coordinates){return}
    this.positionMap.setCoordinatesForMapObject(this.markers.targetCoordinates, coordinates[0], coordinates[1])
  },

  renderVesselOrbitPaths: function(formattedData){
    this.renderOrbitPaths(this.markers.vesselOrbitalPaths, formattedData.vesselOrbitalPaths, { color: this.vesselColor })
    this.renderOrbitPaths(this.markers.vesselSuborbitalPaths, formattedData.vesselSuborbitalPaths, { color: this.vesselSuborbitalColor })
  },

  renderTargetOrbitPaths: function(formattedData){
    this.renderOrbitPaths(this.markers.targetOrbitalPaths, formattedData.targetOrbitalPaths, { color: this.targetColor })
    this.renderOrbitPaths(this.markers.targetSuborbitalPaths, formattedData.targetSuborbitalPaths, { color: this.targetSuborbitalColor })
  },

  renderOrbitPaths: function(markers, orbitPaths, lineOptions){
    //clear all the existing orbital path values
    for (var i = markers.length - 1; i >= 0; i--) {
      markers.setLatLngs([])
    }

    for (var i = 0; i < orbitPaths.length; i++) {
      var orbitPath = orbitPaths[i]
      var coordinates = orbitPath.points

      if(!markers[i]){
        markers[i] = L.polyline([], lineOptions)
        markers[i].addTo(this.positionMap.map)
      }

      var options = {
        dashArray: orbitPath.pathType == "maneuverNode" ? '3' : ''
      }

      var marker = markers[i]
      marker.setLatLngs(coordinates)
      marker.setStyle(options)
    }
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

    var targetMarkerOptions = {
      // fill: false,
      color: this.targetColor,
      opacity: 1.0,
      fillOpacity: 1.0,
      radius: 5
    }

    this.markers = {
      vesselCoordinates : L.circleMarker([0,0], circleMarkerOptions),
      vesselSuborbitalPaths: [],
      vesselOrbitalPaths: [],

      targetCoordinates: L.circleMarker([0,0], targetMarkerOptions),
      targetSuborbitalPaths: [],
      targetOrbitalPaths: [],
    }

    this.markers.vesselCoordinates.addTo(this.positionMap.map)
    this.markers.targetCoordinates.addTo(this.positionMap.map)
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