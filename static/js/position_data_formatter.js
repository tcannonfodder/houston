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
      "vessels": [],
      "orbitPatches": [],
      "maneuverNodes": []
    }

    this.formatReferenceBodies(positionData, formattedData)
    this.formatVessels(positionData, formattedData)
    this.formatOrbitalPatches(positionData, formattedData)
    this.formatManeuverNodes(positionData, formattedData)
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

  formatOrbitalPatches: function(positionData, formattedData){
    for (var i = positionData["o.orbitPatches"].length - 1; i >= 0; i--) {
      var orbitPatch = positionData["o.orbitPatches"][i]
      var positionDataKeys = Object.keys(orbitPatch.positionData)
      var referenceBody = positionData.referenceBodies[orbitPatch.referenceBody]
      var positions = []

      for (var i = positionDataKeys.length - 1; i >= 0; i--) {
        var key = positionDataKeys[i]
        var frameOfReferenceVector = referenceBody.currentTruePosition
        var relativePositionVector = orbitPatch.positionData[key].relativePosition

        positions.push(this.truePositionForRelativePosition(
          relativePositionVector, frameOfReferenceVector
        ))
      }

      formattedData.orbitPatches.push(this.buildOrbitPatch({
        type: "orbitPath",
        parentType: "vessel",
        parentName: "current vessel",
        truePositions: positions
      }))
    }
  },

  formatManeuverNodes: function(positionData, formattedData){
    for (var i = positionData["o.maneuverNodes"].length - 1; i >= 0; i--) {
      var maneuverNode = positionData["o.maneuverNodes"][i]
      var orbitPatches = []

      for (var j = maneuverNode.orbitPatches.length - 1; j >= 0; j--) {
        var orbitPatch = maneuverNode.orbitPatches[j]
        var positionDataKeys = Object.keys(orbitPatch.positionData)
        var referenceBody = positionData.referenceBodies[orbitPatch.referenceBody]
        var positions = []

        for (var k = positionDataKeys.length - 1; k >= 0; k--) {
          var key = positionDataKeys[k]
          var frameOfReferenceVector = referenceBody.currentTruePosition
          var relativePositionVector = orbitPatch.positionData[key].relativePosition

          positions.push(this.truePositionForRelativePosition(
            relativePositionVector, frameOfReferenceVector
          ))
        }

        orbitPatches.push(this.buildOrbitPatch({
          type: "orbitPath",
          parentType: "vessel",
          parentName: "current vessel",
          truePositions: positions
        }))
      }

      formattedData.maneuverNodes.push(this.buildManeuverNode({
        type: "maneuverNode",
        parentType: "vessel",
        parentName: "current vessel",
        orbitPatches: orbitPatches
      }))
    }
  },

  truePositionForRelativePosition: function(relativePositionVector, frameOfReferenceVector){
    var z = math.add(relativePositionVector, frameOfReferenceVector)
    return math.add(relativePositionVector, z)
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
  },

  buildOrbitPatch: function(options){
    return {
      type: options.type,
      parentType: options.parentType,
      parentName: options.parentName,
      truePositions: options.truePositions
    }
  },

  buildManeuverNode: function(options){
    return {
      type: options.type,
      parentType: options.parentType,
      parentName: options.parentName,
      orbitPatches: options.orbitPatches
    }
  }
})