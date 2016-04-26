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
      "distancesFromRootReferenceBody": [],
      "currentUniversalTime": positionData.currentUniversalTime
    }

    this.formatReferenceBodies(positionData, formattedData)
    this.formatCurrentVessel(positionData, formattedData)
    this.formatTargetVessel(positionData, formattedData)
    this.formatOrbitalPatches(positionData, formattedData)
    this.formatManeuverNodes(positionData, formattedData)
    this.formatTargetOrbitPatches(positionData, formattedData)
    this.formatReferenceBodyPaths(positionData, formattedData)
    // this.formatDistancesFromRootReferenceBody(positionData, formattedData)

    this.options.onFormat && this.options.onFormat(formattedData)
  },

  formatReferenceBodies: function(positionData, formattedData){
    referenceBodyNames = Object.keys(positionData.referenceBodies)

    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]
      var info = positionData.referenceBodies[name]
      var type = "currentPosition"

      if(positionData["tar.type"] == "CelestialBody" && positionData["tar.name"] == name){
        type = "targetBodyCurrentPosition"
      }

      var x = this.buildReferenceBody({
        name: name,
        type: type,
        radius: info.radius,
        truePosition: this.formatTruePositionVector(info.currentTruePosition),
        atmosphericRadius: this.datalink.getOrbitalBodyInfo(name).atmosphericRadius,
        color: this.datalink.getOrbitalBodyInfo(name).color
      })

      formattedData["referenceBodies"].push(x)
    }
  },

  formatReferenceBodyPaths: function(positionData, formattedData){
    referenceBodyNames = Object.keys(positionData.referenceBodies)
    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]

      // if(name == this.rootReferenceBodyName){ continue; }
      var info = positionData.referenceBodies[name]
      var positionDataKeys = Object.keys(info.positionData)
      var sortedUniversalTimes = positionDataKeys.map(function(x){return parseFloat(x)}).reverse()

      var positions = []

      for (var j = 0; j < sortedUniversalTimes.length; j++) {
        var key = sortedUniversalTimes[j].toString()

        positions.push(this.formatTruePositionVector(info.positionData[key].truePosition))
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

      var renderPoints = [sortedUniversalTimes.first(),sortedUniversalTimes.last(), sortedUniversalTimes[59]]

      for (var j = 0; j < renderPoints.length; j++) {
        var firstUniversalTime = renderPoints[j]

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
      }
    }
  },

  formatCurrentVessel: function(positionData, formattedData){
    var currentVesselTruePosition = this.truePositionForRelativePosition(
      positionData["vesselCurrentPosition"]["relativePosition"],
      this.formatTruePositionVector(positionData.referenceBodies[positionData["vesselBody"]].currentTruePosition)
    )

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

  formatTargetVessel: function(positionData, formattedData){
    if(!positionData['tar.type']){ return }
    if(positionData["tar.type"] == "Vessel"){
      var targetCurrentTruePosition = this.truePositionForRelativePosition(
        positionData["targetCurrentPosition"]["relativePosition"],
        this.formatTruePositionVector(positionData.referenceBodies[positionData["tar.o.orbitingBody"]].currentTruePosition)
      )

      formattedData.vessels.push(this.buildVessel({
        name: positionData["tar.name"],
        type: "targetVessel",
        truePosition: targetCurrentTruePosition,
        referenceBodyName: positionData["tar.o.orbitingBody"]
      }))
    }
  },

  formatTargetOrbitPatches: function(positionData, formattedData){
    if(!positionData['tar.type']){ return }
    if(positionData["tar.o.orbitPatches"].length > 0){
      formattedData.orbitPatches = formattedData.orbitPatches.concat(this.formatOrbitPatches(
        formattedData, positionData, positionData["tar.o.orbitPatches"], {
          type: "orbitPatch",
          parentType: "targetVessel",
          parentName: positionData["tar.name"]
        },{ linkedPatchType: "orbitPatch" }
      ))
    }
  },

  formatOrbitalPatches: function(positionData, formattedData){
    formattedData.orbitPatches = this.formatOrbitPatches(formattedData,
      positionData, positionData["o.orbitPatches"],{
        type: "orbitPatch",
        parentType: "vessel",
        parentName: "current vessel"
      }, { linkedPatchType: "orbitPatch" }
    )
  },

  formatManeuverNodes: function(positionData, formattedData){
    for (var i = 0; i < positionData["o.maneuverNodes"].length; i++){
      var maneuverNode = positionData["o.maneuverNodes"][i]
      var orbitPatches = this.formatOrbitPatches(formattedData, positionData, maneuverNode.orbitPatches, {
        type: "maneuverNode", parentType: "vessel", parentName: "current vessel"
      }, { linkedPatchType: "maneuverNode" })

      for (var i = 0; i < maneuverNode.orbitPatches.length; i++) {
        var orbitPatch = maneuverNode.orbitPatches[i]
        if(orbitPatch.rootReferenceBody != this.rootReferenceBodyName){
          var referenceBody = positionData.referenceBodies[orbitPatch.referenceBody]
          var sortedUniversalTimes = this.sortedUniversalTimes(orbitPatch.positionData)
          var middleUniversalTime = sortedUniversalTimes[Math.floor((sortedUniversalTimes.length-1)/2.0)]

          var frameOfReferenceVector = this.findProjectedPositionOfReferenceBody(
            this.rootReferenceBody(positionData), referenceBody, middleUniversalTime
          )
        }
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
    return distanceVector
  },

  truePositionForRelativePosition: function(relativePositionVector, frameOfReferenceVector){
    var transformedRelativePositionVector = [
      relativePositionVector[0],
      relativePositionVector[2],
      relativePositionVector[1],
    ]

    return math.add(frameOfReferenceVector, transformedRelativePositionVector)
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

  formatOrbitPatches: function(formattedData, positionData, rawOrbitPatches, orbitPatchOptions, referenceBodyOptions){
    var formattedOrbitPatches = []
    var lastPatchesPoint = null
    var firstPointInPatch = null
    referenceBodyOptions = referenceBodyOptions || {}

    for (var j = 0; j < rawOrbitPatches.length; j++){
      var orbitPatch = rawOrbitPatches[j]
      var referenceBody = positionData.referenceBodies[orbitPatch.referenceBody]
      var sortedUniversalTimes = this.sortedUniversalTimes(orbitPatch.positionData)
      var positions = []
      var distanceFromLastPatchesPoint = null
      var middleUniversalTime = sortedUniversalTimes[Math.floor((sortedUniversalTimes.length-1)/2)]

      for (var k = 0; k < sortedUniversalTimes.length; k++){
        var key = sortedUniversalTimes[k].toString()

        if(orbitPatch.referenceBody == this.rootReferenceBodyName || orbitPatch.referenceBody == "Sun"){
          var frameOfReferenceVector = this.formatTruePositionVector(referenceBody.currentTruePosition)
        } else{
          var frameOfReferenceVector = this.findProjectedPositionOfReferenceBody(
            this.rootReferenceBody(positionData), referenceBody, sortedUniversalTimes[k]
          )
        }

        var relativePositionVector = orbitPatch.positionData[key].relativePosition

        var projectedTruePosition = this.truePositionForRelativePosition(
          relativePositionVector, frameOfReferenceVector
        )

        if(lastPatchesPoint != null){
          if(k == 0){
            firstPointInPatch = projectedTruePosition
            distanceFromLastPatchesPoint = [
              lastPatchesPoint[0] - firstPointInPatch[0],
              lastPatchesPoint[1] - firstPointInPatch[1],
              lastPatchesPoint[2] - firstPointInPatch[2],
            ]
          }

          var projectedTruePosition = [
            projectedTruePosition[0] + distanceFromLastPatchesPoint[0],
            projectedTruePosition[1] + distanceFromLastPatchesPoint[1],
            projectedTruePosition[2] + distanceFromLastPatchesPoint[2],
          ]

          if(middleUniversalTime == sortedUniversalTimes[k] && orbitPatch.referenceBody != this.rootReferenceBodyName){
            var positionOfReferenceBody = [
              frameOfReferenceVector[0] + distanceFromLastPatchesPoint[0],
              frameOfReferenceVector[1] + distanceFromLastPatchesPoint[1],
              frameOfReferenceVector[2] + distanceFromLastPatchesPoint[2],
            ]

            formattedData["referenceBodies"].push(this.buildReferenceBody(Object.extend({
              name: orbitPatch.referenceBody,
              type: "projected",
              radius: referenceBody.radius,
              truePosition: positionOfReferenceBody,
              linkedPatchID: j,
              atmosphericRadius: this.datalink.getOrbitalBodyInfo(orbitPatch.referenceBody).atmosphericRadius
            }, referenceBodyOptions)))
          }
        }

        positions.push(projectedTruePosition)
      }

      lastPatchesPoint = positions.last()

      formattedOrbitPatches.push(this.buildOrbitPatch(Object.extend({
        truePositions: positions
      }, orbitPatchOptions)))
    }

    return formattedOrbitPatches
  },

  formatTruePositionVector: function(vector){
    return vector
  },

  buildReferenceBody: function(options){
    return {
      name: options.name,
      type: options.type,
      radius: options.radius,
      truePosition: options.truePosition,
      linkedPatchID: options.linkedPatchID,
      linkedPatchType: options.linkedPatchType,
      atmosphericRadius: options.atmosphericRadius,
      color: options.color
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
    return positionDataKeys.map(function(x){return parseFloat(x)}).sortBy(function(x){ x }).reverse()
  },

  rootReferenceBody: function(positionData){
    return positionData.referenceBodies[this.rootReferenceBodyName]
  }
})