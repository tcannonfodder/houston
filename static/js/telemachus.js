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
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3581870.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":61.801426478683,"v.lat":-33.9585175016608,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":230.564835549741}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3676217.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-165.90632282676,"v.lat":44.3064867638228,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":114.057337680348}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3976443.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-214.641429986697,"v.lat":33.842717029972,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":50.2472793085986}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":4034854.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-143.849104451046,"v.lat":0.414308005647656,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":3.16662876396108}')
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