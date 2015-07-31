var Telemachus = Class.create({
  initialize: function(host, port){
    this.url = "http://" + host + ":" + port + "/telemachus/datalink"
    this.receiverFunctions = []
    this.subscribedFields = {}
    this.orbitingBodies = this.getOrbitalBodies()
    this.rate = 500

    this.loopTimeout = setTimeout(this.poll.bind(this), this.rate)
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    for (var i = fields.length - 1; i >= 0; i--) {
      var field = fields[i]
      this.subscribedFields[field] = field
    };
  },

  dispatchMessages: function(data){
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      try{
        this.receiverFunctions[i](data)
      } catch(e){
        console.error(e)
      }
    };
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  },

  getOrbitalBodyInfo: function(name){
    var ID = this.orbitingBodies[name]

    if(ID){
      return {name: name, id: ID }
    } else{
      return null
    }
  },

  poll: function(){
    var params = []

    Object.keys(this.subscribedFields).forEach(function(field){
      var sanitizedFieldName = field.replace("[", "{").replace("]","}")
      params.push(sanitizedFieldName + "=" + field)
    })

    var requestURL = this.url + "?" + params.join("&")

    new Ajax.Request(requestURL, {
      method: "get",
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = {}

        Object.keys(rawData).forEach(function(key){
          var convertedFieldName = key.replace("{", "[").replace("}", "]")
          data[convertedFieldName] = rawData[key]
        })

        this.dispatchMessages(data)
      }.bind(this),

      onComplete: function(response){
        setTimeout(this.poll.bind(this),this.rate);
      }.bind(this)
    })
  },

  getOrbitalBodies: function(){
    return {
      "Kerbol" : 0,
      "Kerbin" : 1,
      "Mun" : 2,
      "Minmus" : 3,
      "Moho" : 4,
      "Eve" : 5,
      "Duna" : 6,
      "Ike" : 7,
      "Jool" : 8,
      "Laythe" : 9,
      "Vall" : 10,
      "Bop" : 11,
      "Tylo" : 12,
      "Gilly" : 13,
      "Pol" : 14,
      "Dres" : 15,
      "Eeloo" : 16
    }
  }
})