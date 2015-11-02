var TelemachusWebsocket = Class.create({
  initialize: function(host, port){
    this.socket = new WebSocket("ws://"+ host +":"+port+"/datalink")
    this.socket.onmessage = this.dispatchMessages.bind(this)
    this.receiverFunctions = []
    this.rate = 500
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    this.send({"+" : fields})
  },

  dispatchMessages: function(event){
    var data = JSON.parse(event.data)

    debugger
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      this.receiverFunctions[i](data)
    };

    console.log(data)
  },

  sendMessage: function(params, callback){
    this.socket.send(JSON.stringify({"run":params}))
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  }
})