var Settings = Class.create({
  initialize: function(defaultHost, defaultPort){
    if(!this.getHost()){ this.setHost(defaultHost)}
    if(!this.getPort()){ this.setPort(defaultPort)}
  },

  getHost: function(){
    return this.get('host')
  },

  getPort: function(){
    return this.get('port')
  },

  setHost: function(value){
    return this.set('host', value)
  },

  setPort: function(value){
    return this.set('port', value)
  },

  get: function(property){
    return localStorage.getItem(property)
  },

  set: function(property, value){
    return localStorage.setItem(property, value)
  }
})