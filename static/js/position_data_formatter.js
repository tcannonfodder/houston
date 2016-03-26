var PositionDataFormatter = Class.create({
  initialize: function(orbitalPositionData, datalink, options){
    this.datalink = datalink
    this.orbitalPositionData = orbitalPositionData;
    this.orbitalPositionData.options.onRecalculate = this.format.bind(this)

    this.options = Object.extend({
      onFormat: null,
      numberOfSegments: 120
    }, options)
  },

  format: function(positionData){
    var formattedData = {
      "referenceBodies": [],
      "vessels": []
    }

    this.formatReferenceBodies(positionData, formattedData)
    this.formatVessels(positionData, formattedData)
    this.options.onFormat && this.options.onFormat(formattedData)
  },

  formatReferenceBodies: function(positionData, formattedData){
    referenceBodyNames = Object.keys(positionData.referenceBodies)

    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]
      var info = positionData.referenceBodies[name]
      var x = this.buildReferenceBody({
        name: name,
        radius: info.radius,
        truePosition: info.currentTruePosition
      })

      formattedData["referenceBodies"].push(x)
    }
  },

  formatVessels: function(positionData, formattedData){
    //current vessel
    // debugger
    var currentVesselTruePosition = positionData["vesselCurrentPosition"]["relativePosition"]

    formattedData.vessels.push(
      this.buildVessel({
        name: "current vessel",
        type: "currentVessel",
        truePosition: currentVesselTruePosition,
        referenceBodyName: positionData["vesselBody"]
      })
    )
  },

  truePositionForRelativePosition: function(relativePositionVector, frameOfReferenceVector){
    return [
      frameOfReferenceVector[0] + relativePositionVector[0],
      frameOfReferenceVector[1] + relativePositionVector[1],
      frameOfReferenceVector[2] + relativePositionVector[2],
    ]
  },

  buildReferenceBody: function(options){
    return {
      name: options.name,
      radius: options.radius,
      truePosition: options.truePosition,
      //truePositions: options.truePositions
    }
  },

  buildVessel: function(options){
    return {
      name: options.name,
      type: options.type,
      truePosition: options.truePosition,
      referenceBodyName: options.referenceBodyName
    }
  }
})