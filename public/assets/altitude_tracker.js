var AltitudeTracker = Class.create({
  initialize: function(datalink, altitudeTrackerId, options){
    this.datalink = datalink
    this.altitudeTrackerId = altitudeTrackerId
    this.altitudeTracker = $(this.altitudeTrackerId)
    this.options = Object.extend({
      maxDataPoints: 10
    }, options)

    this.altitudeData = []
    this.heightFromTerrainData = []

    this.initializeDatalink()
  },

  update: function(data){
    this.altitudeData.push(data['v.altitude'])
    if(data['v.terrainHeight'] > -1 && (data['v.heightFromTerrain'] > -1)){
      this.heightFromTerrainData.push(data['v.terrainHeight'])
    } else{
      this.heightFromTerrainData.push(0)
    }

    if(this.altitudeData.length >= this.options.maxDataPoints){
      this.altitudeData.shift()
    }

    if(this.heightFromTerrainData.length >= this.options.maxDataPoints){
      this.heightFromTerrainData.shift()
    }

    if(!this.altitudeTrackerChart){
      this.initializeChart()
    }

    window.requestAnimationFrame(function(){
      this.altitudeTrackerChart.update(this.generateData())
    }.bind(this))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.altitude', 'v.terrainHeight', 'v.heightFromTerrain'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },

  generateData: function(){
    var labelSize = Math.max(this.altitudeData.length, this.heightFromTerrainData.length)
    var labels = []
    for(var i = 0; i < labelSize-1; i++){
      labels[i] = 1
    }

    return {
      labels: labels,
      series: [{
        name: 'altitude',
        data: this.altitudeData
      },
      {
        name: 'terrain',
        data: this.heightFromTerrainData
      }]
    }
  },

  generateOptions: function(){
    return {
      series: {
        'terrain' : {
          showPoint: false,
          showArea: true
        },
        'altitude': {
          showPoint: false
        }
      },
      axisY: {
        offset: 80,
        position: 'end',
        low: 0,
        labelInterpolationFnc: function(value) {
          return numeral(value).format('0.00a') + "m"
        }
      },
      axisX: {
        showLabel: false
      }
    }
  },

  initializeChart: function(){
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
    this.altitudeTrackerChart = new Chartist.Line("#" + this.altitudeTrackerId,
      this.generateData(), this.generateOptions()
    )
  }
})