var AtmosphericDensityGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
    this.func = function(x){return Math.log(2.0 * x)}
  },

  update: function(data){
    var max = this.func(100)
    var value = this.func(data['v.atmosphericPressure'] * 100)
    if(!isFinite(value)){ value = 0 }

    this.gauge.value = value
    this.gauge.max = max
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.atmosphericPressure'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})