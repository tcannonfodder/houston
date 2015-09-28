var CurrentStageBurnInfo = Class.create({
  initialize: function(datalink, atmoTableID, vacuumTableID){
    this.datalink = datalink
    this.atmoTableID = atmoTableID
    this.vacuumTableID = vacuumTableID

    this.atmoDataTable = new DataTable(this.atmoTableID, [])
    this.vacuumDataTable = new DataTable(this.vacuumTableID, [])

    this.currentStageAtmo = null
    this.currentStageVacuum = null
    this.currentBody = null
    this.initializeDatalink()
  },

  update: function(data){
    // don't do anything if we don't have any staging info
    if(!data['mj.stagingInfo']){return }

    //update the body as necessary
    if(this.currentBody == null || this.currentBody.name != data['v.body']){
      this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    }

    // Calculate the info for the current stage in Atmo
    if(data['mj.stagingInfo']["atmo"]){
      //The current stage is always the last stage
      this.currentStageAtmo = this.calculateStageInfo(
        data['mj.stagingInfo']['atmo'].last(), data
      )
    }

    // Calculate the info for the current stage in a Vaccuum
    if(data['mj.stagingInfo']["vacuum"]){
      //The current stage is always the last stage
      this.currentStageVacuum = this.calculateStageInfo(
        data['mj.stagingInfo']['vacuum'].last(), data
      )
    }

    // Now update the tables
    this.atmoDataTable.dataRows = this.dataRowsForStage(
      this.currentStageAtmo, data
    )

    this.vacuumDataTable.dataRows = this.dataRowsForStage(
      this.currentStageVacuum, data
    )

    this.atmoDataTable.update()
    this.vacuumDataTable.update()
  },

  subscribeToBodyData: function(data){
    this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    this.datalink.subscribeToData([
      'b.o.gravParameter[' + this.currentBody.id + ']'
    ])
  },

  calculateStageInfo: function(stage, data){
    stage["currentThrust"] = stage["startThrust"] * data['f.throttle']
    stage["currentTWR"] = OrbitalMath.TWR(stage["currentThrust"],
      stage["startMass"], this.currentBody.surfaceGravity
    )

    stage["timeUntilEmpty"] = OrbitalMath.secondsToUseFuelAtCurrentThrust(
      stage["resourceMass"], stage["currentThrust"], stage["isp"]
    )

    return stage
  },

  dataRowsForStage: function(stage, data){
    var timeUntilEmpty = stage["timeUntilEmpty"] <= 0 ? "NA" : DataFormatters.timeString(stage["timeUntilEmpty"])
    return [
      {
        label: "Current Thrust",
        value: DataFormatters.newtonsString(stage["currentThrust"]) + " (" + DataFormatters.percentageString(data['f.throttle']) + ")"
      },
      {
        label: "TWR",
        value: DataFormatters.plainNumberString(stage["currentTWR"])
      },
      {
        label: "Remaining Fuel",
        value: DataFormatters.tonnageString(stage["resourceMass"])
      },
      {
        label: "Time until empty",
        value: timeUntilEmpty
      }
    ]
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['mj.stagingInfo', 'f.throttle', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})