var AtmosphericDensityGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
  },

  update: function(data){
    var func = function(x){return Math.log(2.0 * x)}

    var max = func(100)
    var value = func(data['v.atmosphericPressure'] * 100)
    console.log(value)
    this.gauge.value = value
    this.gauge.max = max
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.atmosphericPressure'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})