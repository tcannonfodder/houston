var OrbitingBodyInfoTable = Class.create({
  initialize: function(datalink, tableId, options){
    this.datalink = datalink
    this.tableId = tableId
    this.currentBody = null
    this.currentBodyId = null

    this.initializeTable()
    this.initializeDatalink()
  },

  update: function(data){
    if(this.bodyChanged(data)){
      this.updateReadoutTableRows(data)
    }
  },

  propertyForBody: function(property){
    return "b." + property + "[" + this.currentBodyId + "]"
  },

  updateReadoutTableRows: function(data){
    this.currentBody = data['v.body']
    this.currentBodyId = this.datalink.getOrbitalBodyInfo(this.currentBody).id

    var newTableRows = [
      {
        label: "Name",
        value: this.propertyForBody('name'),
        formatter: function(value){ return value }
      },
      {
        label: "Radius",
        value: this.propertyForBody('radius'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Atmosphere Contains O2?",
        value: this.propertyForBody('atmosphereContainsOxygen'),
        formatter: function(value){ return value }
      },
      {
        label: "Sphere of Influence",
        value: this.propertyForBody('soi'),
        formatter: function(value){ return value }
      },
      {
        label: "Max Atmospheric Density",
        value: this.propertyForBody('maxAtmosphere'),
        formatter: function(value){ return value }
      },
      {
        label: "Tidally Locked?",
        value: this.propertyForBody('tidallyLocked'),
        formatter: function(value){ return value }
      },
      {
        label: "GravitationalParameter",
        value: this.propertyForBody('o.gravParameter'),
        formatter: function(value){ return value }
      },
      {
        label: "Body's Relative Velocity",
        value: this.propertyForBody('o.relativeVelocity'),
        formatter: function(value){ return DataFormatters.velocityString(value) }
      },

      {
        label: "Apoapsis",
        value: this.propertyForBody('o.ApA'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Periapsis",
        value: this.propertyForBody('o.PeA'),
        formatter: function(value){ return DataFormatters.distanceString(value) }
      },
      {
        label: "Time to Apoapsis",
        value: this.propertyForBody('o.timeToAp'),
        formatter: function(value){ return "-" + TimeFormatters.durationString(value) }
      },
      {
        label: "Time to Periapsis",
        value: this.propertyForBody('o.timeToPe'),
        formatter: function(value){ return "-" + TimeFormatters.durationString(value) }
      },
      {
        label: "Inclination",
        value: this.propertyForBody('o.inclination'),
        formatter: function(value){ return DataFormatters.degreeString(value) }
      },
      {
        label: "Eccentricity",
        value: this.propertyForBody('o.eccentricity'),
        formatter: function(value){ return value.toFixed(3) }
      },
      {
        label: "Orbital Period",
        value: this.propertyForBody('o.period'),
        formatter: function(value){ return TimeFormatters.durationString(value) }
      },
      {
        label: "True Anomaly",
        value: this.propertyForBody('o.trueAnomaly'),
        formatter: function(value){ return DataFormatters.degreeString(value) }
      },
    ]

    var fieldsToSubscribeTo = newTableRows.map(function(newTableRow){
      return newTableRow.value
    })

    this.datalink.subscribeToData(fieldsToSubscribeTo)

    this.table.dataRows = newTableRows
  },

  bodyChanged: function(data){
    return this.currentBody != data['v.body']
  },

  initializeTable: function(){
    this.table = new ReadoutTable(datalink, this.tableId, [])
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.body'])
    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})