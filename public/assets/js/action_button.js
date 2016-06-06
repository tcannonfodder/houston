var ActionButton = Class.create({
  initialize: function(datalink, buttonID, apiButtonString){
    this.datalink = datalink
    this.buttonID = buttonID
    this.button = $(this.buttonID)
    this.apiButtonString = apiButtonString

    this.button.observe('click', function(event){
      event.preventDefault()

      this.button.addClassName("on")
      this.datalink.sendMessage({"action": this.apiButtonString}, function(){
        this.button.removeClassName("on")
      }.bind(this))
    }.bind(this))
  },
})