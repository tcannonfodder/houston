var PositionMap = Class.create({
  initialize: function(datalink, mapId, options){
    this.datalink = datalink
    this.mapId = mapId
    this.previousBody = "KERBIN"
    this.options = Object.extend({
      lockOnVessel: true
    }, options)
    this.initializeMap()
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.updateBodyIfNecessary(data)
      this.setCoordinatesForMapObject(this.coordinates, data['v.lat'], data['v.long'])
      if(this.options.lockOnVessel){
        this.map.panTo([data['v.lat'], data['v.long']])
      }
    }.bind(this))
  },

  updateBodyIfNecessary: function(data){
    var bodyName = data['v.body'].toUpperCase()
    if(this.previousBody != bodyName){
      newBody = L.KSP.CelestialBody[bodyName];
      newBody.addTo(this.map);
      this.previousBody = bodyName;
    }
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.mapId, {
      layers: [L.KSP.CelestialBody[this.previousBody.toUpperCase()]],
      zoom: 'fit',
      bodyControl: false,
      layerControl: true,
      scaleControl: true
    })

    this.map.fitWorld()

    L.graticule().addTo(this.map)

    var circleMarkerOptions = {
      // fill: false,
      color: '#FD7E23',
      opacity: 1.0,
      fillOpacity: 1.0,
      radius: 5
    }

    this.coordinates = L.circleMarker([0, 0], circleMarkerOptions)
    this.coordinates.addTo(this.map)
  },

  convertCoordinatesToMap: function(latitude, longitude){
    return [latitude, longitude > 180 ? longitude - 360 : longitude]
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)
    object.setLatLng([convertedCoordinates[0], convertedCoordinates[1]])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.lat', 'v.long', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})