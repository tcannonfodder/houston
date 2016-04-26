var BurnPlanner = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink
    /* the options:
        control elements:
        - stage
        - mode
        - throttle
        - burnTime

        display elements:
        - totalThrust
        - startingFuel
        - deltaV
        - TWR
        - remainingFuel
        - warning
    */

    this.options = options || {}
    this.stage = null
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

    this.getStage(data)

    // If the stage was found, do the burn calculations
    if(this.stage){
      var burnedFuel = OrbitalMath.weightOfFuelUsedDuringBurn(
        this.thrust(), this.stage["isp"], this.burnTime()
      )

      if(isNaN(burnedFuel)){
        burnedFuel = 0
      }

      var endMass = this.stage["startMass"] - burnedFuel

      var deltaV = OrbitalMath.deltaVForBurn(this.thrust(),
        this.stage["startMass"], endMass, this.burnTime()
      )

      var TWR = OrbitalMath.TWR(this.thrust(),
        this.stage["startMass"], this.currentBody.surfaceGravity
      )

      if(isNaN(TWR)){
        TWR = 0
      }

      var remainingFuel = this.stage["resourceMass"] - burnedFuel

      window.requestAnimationFrame(function(){
        this.options.totalThrust.update(DataFormatters.newtonsString(this.stage["startThrust"]))
        this.options.startingFuel.update(DataFormatters.tonnageString(this.stage["resourceMass"]))
        this.options.formattedTime.update(DataFormatters.timeString(this.burnTime() || 0))
        this.options.deltaV.update(DataFormatters.velocityString(deltaV))
        this.options.TWR.update(DataFormatters.plainNumberString(TWR))
        this.options.remainingFuel.update(DataFormatters.tonnageString(remainingFuel))

        if(remainingFuel < 0){
          this.options.warning.update("Not enough fuel for burn!")
        } else{
          this.options.warning.update("")
        }
      }.bind(this))
    } else{
      window.requestAnimationFrame(function(){
        //the stage was not found, so return NAs across the board
        this.options.totalThrust.update("NA")
        this.options.startingFuel.update("NA")
        this.options.formattedTime.update("NA")
        this.options.deltaV.update("NA")
        this.options.TWR.update("NA")
        this.options.remainingFuel.update("NA")
        this.options.warning.update("Stage not found!")
      }.bind(this))
    }
  },

  getStage: function(data){
    this.stage = data['mj.stagingInfo'][this.mode()][this.stageIndex()]
  },

  stageIndex: function(){
    return parseInt(this.options.stage.value)
  },

  mode: function(){
    return this.options.mode.value
  },

  throttlePercentage: function(){
    var throttlePercentage = parseFloat(this.options.throttle.value)
    throttlePercentage = Math.max(0.00, throttlePercentage)
    throttlePercentage = Math.min(100.00, throttlePercentage)
    return throttlePercentage
  },

  throttle: function(){
    return this.throttlePercentage()/100.0;
  },

  thrust: function(){
    if(!this.stage){ return 0 }
    return this.stage["startThrust"] * this.throttle();
  },

  burnTime: function(){
    return parseInt(this.options.burnTime.value)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['mj.stagingInfo', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})