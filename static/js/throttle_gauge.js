var ThrottleGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
  },

  update: function(data){
    this.gauge.value = data['f.throttle'] * 100
    this.gauge.max = 100
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['f.throttle'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})