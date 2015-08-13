var PositionMap = Class.create({
  initialize: function(datalink, mapId){
    this.datalink = datalink
    this.mapId = mapId
    this.initializeMap()
    this.initializeDatalink()
  },

  update: function(data){
    this.setCoordinatesForMapObject(this.coordinates, data['v.lat'], data['v.long'])
    // debugger
    this.map.panTo([data['v.lat'], data['v.long']])
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.mapId, {
      layers: [L.KSP.CelestialBody.KERBIN],
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
    return [latitude, longitude > 180 ? longitude - 180 : longitude]
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    var convertedCoordinates = this.convertCoordinatesToMap(latitude, longitude)
    object.setLatLng([convertedCoordinates[0], convertedCoordinates[1]])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.lat', 'v.long'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})