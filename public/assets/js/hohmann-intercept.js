var HohmannIntercept = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink
    this.options = options || {}
    this.targetBody = {}
    this.vessel = {}

    // This is the basic math info we'll need, along with the data to get
    // additional info about the target and the orbiting bodies in question
    this.datalink.subscribeToData([
      'v.altitude', 'o.ApA', 'o.PeA', 'v.orbitalVelocity',
      'tar.o.ApA', 'tar.o.PeA', 'tar.name', 'tar.o.orbitingBody', 'v.body'
    ])

    this.datalink.addReceiverFunction(this.getVesselAndTargetInfo.bind(this))
    this.datalink.addReceiverFunction(this.updateCalculations.bind(this))
  },

  getVesselAndTargetInfo: function(data){
    if(this.isnoTarget(data)){return}
    this.targetBody = this.datalink.getOrbitalBodyInfo(data['tar.name'])
    this.targetBody.orbitingBody = this.datalink.getOrbitalBodyInfo(data['tar.o.orbitingBody'])
    this.targetBody.periapsis = data['tar.o.ApA']
    this.vessel.orbitingBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    this.vessel.periapsis = data['o.ApA']
    this.vessel.altitude = data['v.altitude']
    this.vessel.orbitalVelocity = data['v.orbitalVelocity']

    this.datalink.subscribeToData([
      "b.o.gravParameter["+ this.vessel.orbitingBody.id +"]",
      "b.radius["+ this.vessel.orbitingBody.id +"]",
      "b.o.phaseAngle["+ this.targetBody.id +"]"
    ])
  },

  updateCalculations: function(data){
    if(this.isnoTarget(data)){
      this.clearData()
    } else{
      this.calculateDeltaV(data)
      this.calculatePhaseAngle(data)
    }

    document.fire('hohmann-intercept:update')
  },

  isnoTarget:function(data){
    return data['tar.name'].toLowerCase() == "no target selected."
  },

  calculateDeltaV: function(data){
    var radiusOfBody = data["b.radius["+ this.vessel.orbitingBody.id +"]"]
    var r1 = data['o.ApA'] + radiusOfBody
    var r2 = data['tar.o.ApA'] + radiusOfBody
    var mu = data["b.o.gravParameter["+ this.vessel.orbitingBody.id +"]"];

    var factor1 = Math.sqrt(mu/r1)
    var factor2 = Math.sqrt((2 * r2)/(r1 + r2))

    this.deltaV = factor1 * (factor2 - 1)

    console.log("delta V1: " + this.deltaV)
  },

  isGoForIntercept: function(){
    return (
      this.phaseAngle <= this.targetsCurrentPhaseAngle + 5 &&
      this.phaseAngle >= this.targetsCurrentPhaseAngle - 5 &&
      this.deltaV > 5
    )
  },

  calculatePhaseAngle: function(data){
    var r1 = data['o.PeA']
    var r2 = data['tar.o.PeA']
    var radius = data["b.radius["+ this.vessel.orbitingBody.id +"]"]
    var numberOfOrbits = Math.pow(0.5 * ( (r1 + r2 + (2*radius) )/((2*radius) + (2*r2)) ), 1.5)

    if(numberOfOrbits < 1){
      var fractionalPart = numberOfOrbits
    } else{
      var fractionalPart = (numberOfOrbits % 1)
    }

    this.sweepAngle = 360 * fractionalPart
    this.phaseAngle = 180 - this.sweepAngle

    this.targetsCurrentPhaseAngle = data["b.o.phaseAngle["+ this.targetBody.id +"]"]

    console.log("Phase Angle: " + this.phaseAngle + " targetsCurrentPhaseAngle: " + this.targetsCurrentPhaseAngle)

    if(this.isGoForIntercept()){
      console.log("FIRE EVERYTHING")
    }
  },

  clearData: function(){
    this.vessel.altitude = null
    this.vessel.periapsis = null
    this.vessel.orbitalVelocity = null
    this.targetBody = null
    this.sweepAngle = null
    this.phaseAngle = null
    this.targetsCurrentPhaseAngle = null
    this.deltaV = null
  }
})