var AtmosphericDensityGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
  },

  update: function(data){
    var maxDensity = 1.0;

    var currentPercentage = (data['v.atmosphericDensity']/maxDensity) * 100

    this.gauge.value = currentPercentage
    this.gauge.max = 100
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.atmosphericDensity'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})