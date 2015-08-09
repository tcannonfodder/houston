var ButtonIndicator = Class.create({
  initialize: function(datalink, indicatorId, apiButtonString){
    this.datalink = datalink
    this.indicatorId = indicatorId
    this.indicator = $(this.indicatorId)
    this.apiButtonString = apiButtonString
    this.initializeDatalink()
  },

  update: function(data){
    if(data[this.apiButtonString] == "True"){
      this.indicator.addClassName("on")
    } else{
      this.indicator.removeClassName("on")
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([this.apiButtonString])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})