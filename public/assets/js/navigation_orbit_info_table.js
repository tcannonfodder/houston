var NavigationOrbitInfoTable = Class.create({
  initialize: function(datalink, fieldIDs){
    this.datalink = datalink
    this.fieldIDs = fieldIDs
    this.fields = {}

    this.initializeFields()
    this.initializeDatalink()
  },

  update: function(data){
    this.updateTable(data)
  },

  updateTable: function(data){
    window.requestAnimationFrame(function(){
      this.fields.vesselBody.update(data['v.body'])
      this.fields.targetBody.update(data['v.body'])

      this.fields.vesselAltitude.update(DataFormatters.distanceString(data['v.altitude']))

      this.fields.vesselApoapsis.update(DataFormatters.distanceString(data['o.ApA']))
      this.fields.targetApoapsis.update(DataFormatters.distanceString(data['tar.o.ApA']))

      this.fields.vesselPeriapsis.update(DataFormatters.distanceString(data['o.PeA']))
      this.fields.targetPeriapsis.update(DataFormatters.distanceString(data['tar.o.PeA']))

      this.fields.vesselTimeToApoapsis.update("-" + TimeFormatters.durationString(data['o.timeToAp']))
      this.fields.targetTimeToApoapsis.update("-" + TimeFormatters.durationString(data['tar.o.timeToAp']))

      this.fields.vesselTimeToPeriapsis.update("-" + TimeFormatters.durationString(data['o.timeToPe']))
      this.fields.targetTimeToPeriapsis.update("-" + TimeFormatters.durationString(data['tar.o.timeToPe']))

      this.fields.vesselInclination.update(DataFormatters.degreeString(data['o.inclination']))
      this.fields.targetInclination.update(DataFormatters.degreeString(data['tar.o.inclination']))

      this.fields.vesselEccentricity.update(data['o.eccentricity'].toFixed(3))
      this.fields.targetEccentricity.update(data['tar.o.eccentricity'].toFixed(3))

      this.fields.vesselOrbitalPeriod.update(TimeFormatters.durationString(data['o.period']))
      this.fields.targetOrbitalPeriod.update(TimeFormatters.durationString(data['tar.o.period']))

      this.fields.vesselTrueAnomaly.update(DataFormatters.degreeString(data['o.trueAnomaly']))
      this.fields.targetTrueAnomaly.update(DataFormatters.degreeString(data['tar.o.trueAnomaly']))

      this.fields.vesselSurfaceVelocity.update(DataFormatters.velocityString(data['v.surfaceVelocity']))

      this.fields.vesselVerticalSpeed.update(DataFormatters.velocityString(data['v.verticalSpeed']))

      this.fields.vesselOrbitalVelocity.update(DataFormatters.velocityString(data['v.orbitalVelocity']))

      this.fields.vesselRelativeVelocity.update(DataFormatters.velocityString(data['o.relativeVelocity']))
      this.fields.targetRelativeVelocity.update(DataFormatters.velocityString(data['tar.o.relativeVelocity']))

      this.fields.vesselGForce.update(data['v.geeForce'].toFixed(2))
    }.bind(this))
  },

  initializeFields: function(){
    var fieldNames = Object.keys(this.fieldIDs)
    for (var i = fieldNames.length - 1; i >= 0; i--) {
      var fieldName = fieldNames[i]
      this.fields[fieldName] = $(this.fieldIDs[fieldName])
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      "v.body",
      "tar.o.orbitingBody",

      "v.altitude",
      //NA

      "o.ApA",
      "tar.o.ApA",

      "o.PeA",
      "tar.o.PeA",

      "o.timeToAp",
      "tar.o.timeToAp",

      "o.timeToPe",
      "tar.o.timeToPe",

      "o.inclination",
      "tar.o.inclination",

      "o.eccentricity",
      "tar.o.eccentricity",

      "o.period",
      "tar.o.period",

      "o.trueAnomaly",
      "tar.o.trueAnomaly",

      "v.surfaceVelocity",
      //NA

      "v.verticalSpeed",
      //NA

      "v.orbitalVelocity",
      //NA

      "o.relativeVelocity",
      "tar.o.relativeVelocity",

      "v.geeForce",
      //NA
    ])
    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})