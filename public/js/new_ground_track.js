var NewGroundTrack = Class.create({
  initialize: function(datalink, map_id){
    this.datalink = datalink
    this.map_id = map_id
    this.initializeMap()
    this.initializeDatalink()
  },

  recalculate: function(data){
    // load data from KSP
    var eccentricity = data["o.eccentricity"] //no unit
    var trueAnomalyInDegrees = data["o.trueAnomaly"] //degrees
    var trueAnomalyInRadians = Math.toRadians(trueAnomalyInDegrees) //radians
    var gravitationalParameter = 3531600000000 // Gm/s^2
    var semiMajorAxis = data["o.sma"] //meters
    var startTime = 0 //seconds
    var endTime = 0 //seconds
    var inclinationInDegrees = data["o.inclination"] // degrees
    var inclinationInRadians = Math.toRadians(inclinationInDegrees) // radians
    var longitudeOfAscendingNodeInDegrees = data["o.lan"] //degrees
    var longitudeOfAscendingNodeInRadians = Math.toRadians(longitudeOfAscendingNodeInDegrees) //radians
    var argumentOfPeriapsisInDegrees = data["o.argumentOfPeriapsis"] //degrees
    var argumentOfPeriapsisInRadians = Math.toRadians(argumentOfPeriapsisInDegrees) //radians
    var orbitalPeriod = data["o.period"] // seconds
    var angularVelocityOfVessel = data["v.angularVelocity"] // meters/second
    var universalGravitationalParameter = 6.673999953095288e-11
    var rotationalPeriodOfKerbin = 21599.9120145401 //seconds
    var universalDateTime = data["t.universalTime"] //seconds

    this.actualLatitudeInDegrees = data["v.lat"] //degrees
    this.actualLatitudeInRadians = Math.toRadians(this.actualLatitudeInDegrees) //radians

    this.actualLongitudeInDegrees = data["v.long"] //degrees
    this.actualLongitudeInRadians = Math.toRadians(this.actualLongitudeInDegrees) //radians

    

    this.updateMap()
  },

  setCoordinatesForMapObject: function(object, latitude, longitude){
    object.setLatLng([latitude, longitude > 180 ? longitude - 360 : longitude])
  },

  updateMap: function(){
    this.setCoordinatesForMapObject(this.markers.actualCoordinates, this.actualLatitudeInDegrees, this.actualLongitudeInDegrees)
    this.setCoordinatesForMapObject(this.markers.estimatedCoordinates, Math.toDegrees(this.estimatedLatitude), Math.toDegrees(this.estimatedLongitude))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.trueAnomaly', 'o.sma', 'o.maae', 'o.eccentricity',
      'o.inclination', 'o.lan', 'o.argumentOfPeriapsis', 'v.lat', 'v.long',
      'o.period', 'v.angularVelocity', 't.universalTime', "b.o.gravParameter[1]"
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },

  initializeMap: function(){
    this.map = new L.KSP.Map(this.map_id, {
      layers: [L.KSP.CelestialBody.KERBIN],
      zoom: L.KSP.CelestialBody.KERBIN.defaultLayer.options.maxZoom,
      center: [-0.1027, -74.5754],
      bodyControl: false,
      layerControl: true,
      scaleControl: true
    })

    this.map.fitWorld()

    L.graticule().addTo(this.map)

    var estimationIcon = L.icon({
      iconUrl: 'markers-anomaly.png',
      shadowUrl: 'marker-shadow.png',
      iconSize:     [25, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor:  [-1, -34] // point from which the popup should open relative to the iconAnchor
    })


    this.markers = {
      actualCoordinates : L.marker([0, 0]),
      estimatedCoordinates : L.marker([0,0], {icon: estimationIcon})
    }

    this.markers.actualCoordinates.addTo(this.map)
    this.markers.estimatedCoordinates.addTo(this.map)
  }
})