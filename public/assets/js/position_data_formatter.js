var PositionDataFormatter = Class.create({
  initialize: function(orbitalPositionData, datalink, options){
    this.datalink = datalink
    this.orbitalPositionData = orbitalPositionData;
    this.orbitalPositionData.options.onRecalculate = this.format.bind(this)

    this.rootReferenceBodyName = null

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
      "maneuverNodes": [],
      "referenceBodyPaths": [],
      "distancesFromRootReferenceBody": []
    }

    this.formatReferenceBodies(positionData, formattedData)
    this.formatVessels(positionData, formattedData)
    this.formatOrbitalPatches(positionData, formattedData)
    this.formatManeuverNodes(positionData, formattedData)
    this.formatReferenceBodyPaths(positionData, formattedData)
    this.formatDistancesFromRootReferenceBody(positionData, formattedData)

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

  formatReferenceBodyPaths: function(positionData, formattedData){
    referenceBodyNames = Object.keys(positionData.referenceBodies)
    // debugger
    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]

      // if(name == this.rootReferenceBodyName){ continue; }
      var info = positionData.referenceBodies[name]
      var positionDataKeys = Object.keys(info.positionData)
      var sortedUniversalTimes = positionDataKeys.map(function(x){return parseFloat(x)}).reverse()

      var positions = []

      for (var j = 0; j < sortedUniversalTimes.length; j++) {
        var key = sortedUniversalTimes[j].toString()

        positions.push(info.positionData[key].truePosition)
      }

      var x = this.buildReferenceBodyPath({
        referenceBodyName: name,
        truePositions: positions
      })

      formattedData.referenceBodyPaths.push(x)
    }
  },

  formatDistancesFromRootReferenceBody: function(positionData, formattedData){
    referenceBodyNames = Object.keys(positionData.referenceBodies)
    var rootReferenceBody = positionData.referenceBodies[this.rootReferenceBodyName]

    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]
      if(name == this.rootReferenceBodyName){ continue; }

      var body = positionData.referenceBodies[name]
      var sortedUniversalTimes = this.sortedUniversalTimes(body.positionData)

      // for (var j = 0; j < sortedUniversalTimes.length; j++) {
        // debugger
        var firstUniversalTime = sortedUniversalTimes.first()

        var projectedPositionOfReferenceBody = this.findProjectedPositionOfReferenceBody(rootReferenceBody, body, firstUniversalTime)

        var positions = [
          rootReferenceBody.currentTruePosition,
          projectedPositionOfReferenceBody
        ]

        var x = this.buildDistanceFromRootReferenceBody({
          referenceBodyName: name,
          truePositions: positions
        })

        formattedData.distancesFromRootReferenceBody.push(x)
      // }
    }
  },

  formatVessels: function(positionData, formattedData){
    //current vessel
    // debugger
    var currentVesselTruePosition = positionData["vesselCurrentPosition"]["relativePosition"]

    this.rootReferenceBodyName = positionData["vesselBody"]

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
    for (var i = 0; i < positionData["o.maneuverNodes"].length; i++){
      var maneuverNode = positionData["o.maneuverNodes"][i]
      var orbitPatches = []


      for (var j = 0; j < maneuverNode.orbitPatches.length; j++){
        var orbitPatch = maneuverNode.orbitPatches[j]
        var referenceBody = positionData.referenceBodies[orbitPatch.referenceBody]
        var sortedUniversalTimes = this.sortedUniversalTimes(orbitPatch.positionData)
        console.log(orbitPatch.referenceBody)
        // debugger
        console.log(sortedUniversalTimes)
        var positions = []

        for (var k = 0; k < sortedUniversalTimes.length; k++){
          var key = sortedUniversalTimes[k].toString()

          if(orbitPatch.referenceBody == this.rootReferenceBodyName){
            var frameOfReferenceVector = referenceBody.currentTruePosition
          } else{
            var frameOfReferenceVector = this.findProjectedPositionOfReferenceBody(
              this.rootReferenceBody(positionData), referenceBody, sortedUniversalTimes.last()
            )
            // var frameOfReferenceVector = referenceBody.positionData[sortedUniversalTimes[0].toString()].truePosition
          }

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

  findDistanceVectorBetweenBodiesAtTime: function(rootBody, targetBody, universalTime){
    var closestUniversalTime = this.findTruePositionClosestToRelativeTime(universalTime, rootBody.positionData)

    return [
      rootBody.positionData[closestUniversalTime].truePosition,
      targetBody.positionData[universalTime].truePosition
    ]
  },

  findProjectedPositionOfReferenceBody: function(rootReferenceBody, body, universalTime){
    var distancePoints = this.findDistanceVectorBetweenBodiesAtTime(rootReferenceBody, body, universalTime)
    var distanceVector = math.add(distancePoints[1], math.multiply(-1, distancePoints[0]))

    var currentTruePositionForReferenceBody = body.currentTruePosition
    var currentDistanceVector = math.add(currentTruePositionForReferenceBody, math.multiply(-1, rootReferenceBody.currentTruePosition))

    return math.add(currentDistanceVector, math.add(rootReferenceBody.currentTruePosition, distanceVector))
  },

  truePositionForRelativePosition: function(relativePositionVector, frameOfReferenceVector){
    var z = math.add(relativePositionVector, frameOfReferenceVector)
    return math.add(relativePositionVector, z)
  },

  findTruePositionClosestToRelativeTime: function(universalTime, positionData){
    var positionDataKeys = Object.keys(positionData)
    var sortedUniversalTimes = positionDataKeys.map(function(x){return parseFloat(x)}).sortBy(function(s) {
      return s;
    })

    var closestTime = null
    var closestDistance = null

    for (var i = 0; i < sortedUniversalTimes.length; i++) {
      var time = sortedUniversalTimes[i]
      var distance = Math.abs(universalTime - time)

      if((closestTime == null && closestDistance == null) || distance < closestDistance ){
        closestTime = time
        closestDistance = distance
      }
    }

    return closestTime
  },

  buildReferenceBody: function(options){
    return {
      name: options.name,
      radius: options.radius,
      truePosition: options.truePosition,
      //truePositions: options.truePositions
    }
  },

  buildReferenceBodyPath: function(options){
    return {
      referenceBodyName: options.referenceBodyName,
      truePositions: options.truePositions
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
  },

  buildDistanceFromRootReferenceBody: function(options){
    return {
      referenceBodyName: options.referenceBodyName,
      truePositions: options.truePositions
    }
  },

  sortedUniversalTimes: function(positionData){
    var positionDataKeys = Object.keys(positionData)
    return positionDataKeys.map(function(x){return parseFloat(x)}).sortBy(function(x){ x })
  },

  rootReferenceBody: function(positionData){
    return positionData.referenceBodies[this.rootReferenceBodyName]
  }
})