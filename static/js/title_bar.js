var TitleBar = Class.create({
  initialize: function(datalink, title_bar_id){
    this.datalink = datalink
    this.title_bar_id = title_bar_id
    this.title_bar = $(this.title_bar_id)
    this.initializeDatalink()
  },

  update: function(data){
    this.title_bar.down("#world-clock").update(TimeFormatters.formatUT(data["t.universalTime"]))
    this.title_bar.down("#mission-time").update(TimeFormatters.formatMET(data["v.missionTime"]))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      't.timeWarp', 't.universalTime', 'v.missionTime'
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})