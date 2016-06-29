var GroundTrack = Class.create({
  initialize: function(datalink, positionDataFormatter, map_id, altitudeEstimationId){
    this.datalink = datalink
    this.positionDataFormatter = positionDataFormatter
    this.map_id = map_id
    this.altitudeEstimationId = altitudeEstimationId

    this.vesselColor = '#F5A623'
    this.vesselSuborbitalColor = 'red'
    this.maneuverNodeColor = '#b4f489'
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
    this.updateAltitudeEstimateChart(formattedData)
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
      markers[i].setLatLngs([])
    }

    for (var i = 0; i < orbitPaths.length; i++) {
      var orbitPath = orbitPaths[i]
      var coordinates = orbitPath.points

      if(!markers[i]){
        markers[i] = L.polyline([], lineOptions)
        markers[i].addTo(this.positionMap.map)
      }

      var options = {
        dashArray: orbitPath.pathType == "maneuverNode" ? '5,10' : ''
      }

      if(orbitPath.pathType == "maneuverNode"){
        options.color = this.maneuverNodeColor
      }

      var marker = markers[i]
      marker.setLatLngs(coordinates)
      marker.setStyle(options)
    }
  },

  updateAltitudeEstimateChart: function(formattedData){
    if(!this.altitudeEstimateChart){ return }

    var chartData = {
      labels: [], series: [
        {
          name: 'vessel',
          data: []
        },
        {
          name: 'atmosphere',
          data: []
        },
        {
          name: 'vesselManeuver',
          data: []
        }
      ]
    }

    if(formattedData.targetCurrentCoordinates){
      chartData.push({
        name: 'target',
        data: []
      })
    }

    var maxLabelSections = 10
    var interval = 60 * 5 //seconds based
    var intervalsCovered = {}

    var rawChartData = {}

    this.buildAltitudePointsForChart(
      formattedData.vesselOrbitalPaths.filter(function(x){ return x.pathType == "orbitPath" }),
      formattedData.vesselSuborbitalPaths.filter(function(x){ return x.pathType == "orbitPath" }),
      "vessel",
      rawChartData
    )

    this.buildAltitudePointsForChart(
      formattedData.vesselOrbitalPaths.filter(function(x){ return x.pathType == "maneuverNode" }),
      formattedData.vesselSuborbitalPaths.filter(function(x){ return x.pathType == "maneuverNode" }),
      "vesselManeuver",
      rawChartData
    )

    this.buildAltitudePointsForChart(
      formattedData.targetOrbitalPaths,
      formattedData.targetSuborbitalPaths,
      "target",
      rawChartData
    )

    var sortedUniversalTimes = this.sortedUniversalTimes(rawChartData).sort()
    if(sortedUniversalTimes.length > 0){
      var startTime = parseFloat(sortedUniversalTimes.first())
      var endTime = parseFloat(sortedUniversalTimes.last())

      var totalDelta = sortedUniversalTimes.length
      var intervalPeriod = Math.floor(totalDelta/maxLabelSections)
    }

    for (var i = 0; i < sortedUniversalTimes.length; i++) {
      var time = sortedUniversalTimes[i]
      var deltaT = time - startTime
      var dataPoint = rawChartData[time]

      var intervalSection = Math.floor(i/intervalPeriod)
      if(!intervalsCovered[intervalSection] && intervalSection != 0){
        var label = "-" + TimeFormatters.durationString(deltaT.toFixed(0))
        intervalsCovered[intervalSection] = true
      } else{
        var label = ""
      }

      chartData.labels.push(label)

      chartData.series[0].data.push(dataPoint.vessel || null)
      chartData.series[1].data.push(formattedData.atmosphericRadius || null)
      chartData.series[2].data.push(dataPoint.vesselManeuver || null)

      if(formattedData.targetCurrentCoordinates){
        chartData.series[3].data.push(dataPoint.target || null)
      }
    }

    var chartOptions = {
      lineSmooth: Chartist.Interpolation.cardinal({ fillHoles: true }),
      low: 0,
      series: {
        'atmosphere': {
          showArea: true,
          showPoint: false
        },
        'target': {
          lineSmooth: Chartist.Interpolation.cardinal({ fillHoles: true })
        },
        'vessel': {
          lineSmooth: Chartist.Interpolation.cardinal({ fillHoles: true })
        },
        'vesselManeuver': {
          lineSmooth: Chartist.Interpolation.cardinal({ fillHoles: true })
        },
      }
    }

    window.requestAnimationFrame(function(){
      this.altitudeEstimateChart.update(chartData, chartOptions)
    }.bind(this))
  },

  buildAltitudePointsForChart: function(orbitPaths, subOrbitalPaths, type, rawChartData){
    var altitudePoints = {}

    orbitPaths.forEach(function(orbitPath){
      orbitPath.altitudes.forEach(function(x){ altitudePoints[x.time] = x.altitude })
    })

    subOrbitalPaths.forEach(function(orbitPath){
      orbitPath.altitudes.forEach(function(x){ altitudePoints[x.time] = x.altitude })
    })

    var sortedUniversalTimes = this.sortedUniversalTimes(altitudePoints)
    if(sortedUniversalTimes.length > 0){
      var startTime = parseFloat(sortedUniversalTimes[0])
    }

    for (var i = 0; i < sortedUniversalTimes.length; i++) {
      var time = sortedUniversalTimes[i]
      var altitude = altitudePoints[time]

      rawChartData[time] = rawChartData[time] || {}
      rawChartData[time][type] = altitude
    }
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

    if($(this.altitudeEstimationId) == null){
      this.altitudeEstimateChart = null
    } else{
      // Create a new line chart object where as first parameter we pass in a selector
      // that is resolving to our chart container element. The Second parameter
      // is the actual data object.
      this.altitudeEstimateChart = new Chartist.Line("#" + this.altitudeEstimationId, data);
    }
  },

  sortedUniversalTimes: function(data){
    var keys = Object.keys(data)
    return keys.map(function(x){return parseFloat(x)}).sortBy(function(x){ x }).reverse()
  },
})