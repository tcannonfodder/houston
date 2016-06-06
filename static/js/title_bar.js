var TitleBar = Class.create({
  initialize: function(datalink, title_bar_id){
    this.datalink = datalink
    this.title_bar_id = title_bar_id
    this.title_bar = $(this.title_bar_id)
    this.initializeLOSNotifier()
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.title_bar.down("#world-clock").update(TimeFormatters.formatUT(data["t.universalTime"]))
      this.title_bar.down("#mission-time").update(TimeFormatters.formatMET(data["v.missionTime"]))

      this.title_bar.down("#mission-time").removeClassName("loss-of-signal")
    }.bind(this))
  },

  initializeLOSNotifier:function(){
    document.observe('telemachus:loss-of-signal', function(){
      window.requestAnimationFrame(function(){
        this.title_bar.down("#mission-time").update("&#9888; LOS &#9888;")
        this.title_bar.down("#mission-time").addClassName("loss-of-signal")
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      't.timeWarp', 't.universalTime', 'v.missionTime'
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})