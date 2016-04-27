var GroundTrackPositionDataFormatter = Class.create({
  initialize: function(orbitalPositionData, datalink, options){
    this.datalink = datalink
    this.orbitalPositionData = orbitalPositionData;
    this.orbitalPositionData.options.onRecalculate = this.format.bind(this)

    this.rootReferenceBodyName = null
    this.currentUniversalTime = null

    this.options = Object.extend({
      onFormat: null,
      numberOfSegments: 120
    }, options)
  },

  format: function(positionData){
    var formattedData = {
      "vesselCurrentCoordinates": null,
      "targetCurrentCoordinates": null,

      "vesselSuborbitalPaths": [],
      "vesselOrbitalPaths": [],

      "targetSuborbitalPaths": [],
      "targetOrbitalPaths": [],

      "currentUniversalTime": positionData.currentUniversalTime,
      "referenceBodyName": positionData.vesselBody,
      "atmosphericRadius": this.datalink.getOrbitalBodyInfo(positionData.vesselBody).atmosphericRadius
    }

    this.currentUniversalTime = positionData.currentUniversalTime
    this.formatVesselCurrentCoordinates(positionData, formattedData)
    this.formatTargetCurrentCoordinates(positionData, formattedData)
    this.formatVesselOrbitalPaths(positionData, formattedData)
    this.formatTargetOrbitalPaths(positionData, formattedData)

    this.options.onFormat && this.options.onFormat(formattedData)
  },

  formatVesselCurrentCoordinates: function(positionData, formattedData){
    this.rootReferenceBodyName = positionData["vesselBody"]
    var currentPosition = positionData["vesselCurrentPosition"]["relativePosition"]
    var info = this.rootReferenceBody(positionData)

    formattedData.vesselCurrentCoordinates = this.coordinatesFromVector(currentPosition, info.radius)
  },


  formatTargetCurrentCoordinates: function(positionData, formattedData){
    if(this.rootReferenceBodyName != positionData["tar.o.orbitingBody"]){ return }
    if(positionData["tar.type"] != "Vessel"){ return }
    var currentPosition = positionData["targetCurrentPosition"]["relativePosition"]
    var info = this.rootReferenceBody(positionData)

    formattedData.targetCurrentCoordinates = this.coordinatesFromVector(currentPosition, info.radius)
  },

  formatVesselOrbitalPaths: function(positionData, formattedData){
    var parentType = "currentVessel"
    var orbitPatches = positionData["o.orbitPatches"]

    var pathSet = this.formatPathSet(positionData, orbitPatches, parentType, "orbitPath")

    formattedData.vesselOrbitalPaths = formattedData.vesselOrbitalPaths.concat(pathSet.filter(function(x){ return x.type == "orbital" }))
    formattedData.vesselSuborbitalPaths = formattedData.vesselSuborbitalPaths.concat(pathSet.filter(function(x){ return x.type == "suborbital" }))

    this.formatManeuverNodes(positionData, formattedData, positionData["o.maneuverNodes"], parentType)
  },

  formatTargetOrbitalPaths: function(positionData, formattedData){
    if(positionData["tar.type"] != "Vessel"){ return }
    var parentType = "targetVessel"
    var orbitPatches = positionData["tar.o.orbitPatches"]

    var pathSet = this.formatPathSet(positionData, orbitPatches, parentType, "orbitPath")

    formattedData.targetOrbitalPaths = pathSet.filter(function(x){ return x.type == "orbital" })
    formattedData.targetSuborbitalPaths = pathSet.filter(function(x){ return x.type == "suborbital" })
  },

  formatManeuverNodes: function(positionData, formattedData, maneuverNodes, parentType){
    for (var i = 0; i < maneuverNodes.length; i++) {
      var node = maneuverNodes[i]
      if(node.referenceBody != this.rootReferenceBodyName){ break }

      //render each orbit patch as an array of 1 so we can break once the path set returns empty (it's left the SOI)
      for (var j = 0; j < node.orbitPatches.length; j++) {
        var orbitPatches = [node.orbitPatches[j]]
        var pathSet = this.formatPathSet(positionData, orbitPatches, parentType, "maneuverNode")
        if(pathSet.length == 0){ return }

        formattedData.vesselOrbitalPaths = formattedData.vesselOrbitalPaths.concat(pathSet.filter(function(x){ return x.type == "orbital" }))
        formattedData.vesselSuborbitalPaths = formattedData.vesselSuborbitalPaths.concat(pathSet.filter(function(x){ return x.type == "suborbital" }))
      }
    }
  },

  formatPathSet: function(positionData, orbitPatches, parentType, pathType){
    var pathSets = []
    var currentPathType = null
    var currentPathSet = null
    var info = this.rootReferenceBody(positionData)
    var orbitalClearanceDistance = this.orbitalClearanceDistance(positionData)

    for (var i = 0; i < orbitPatches.length; i++) {
      var orbitPatch = orbitPatches[i]
      //If we extend beyond the root reference body then hard-stop the loop. We've escaped the SOI
      if(orbitPatch.referenceBody != this.rootReferenceBodyName){ break }

      var sortedUniversalTimes = this.sortedUniversalTimes(orbitPatch.positionData)

      for (var j = 0; j < sortedUniversalTimes.length; j++){
        var key = sortedUniversalTimes[j].toString()
        var position = orbitPatch.positionData[key].relativePosition

        var coordinates = this.coordinatesFromVector(position, info.radius)
        if(coordinates.length == 0){ continue }
        var length = this.vectorLength(position)

        // don't render any points that are underneath the body's surface or back in time
        if(length <= info.radius || (sortedUniversalTimes[j] < this.currentUniversalTime && pathType != "maneuverNode" ) ){
          continue
        } else if(length > orbitalClearanceDistance){
          var type = "orbital"
        } else{
          var type = "suborbital"
        }

        if(type != currentPathType){
          currentPathSet = this.buildOrbitPath({
            type: type,
            parentType: parentType,
            pathType: pathType,
            points: [],
            altitudes: []
          })
          pathSets.push(currentPathSet)
        }

        currentPathSet.points.push(coordinates)
        currentPathSet.altitudes.push({time: sortedUniversalTimes[j], altitude: length - info.radius})
        currentPathType = type
      }
    }

    return pathSets
  },

  buildOrbitPath: function(options){
    return {
      type: options.type,
      pathType: options.pathType,
      parentType: options.parentType,
      points: options.points,
      altitudes: options.altitudes
    }
  },

  vectorLength: function(vector){
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2))
  },

  coordinatesFromVector: function(vector, radius){
    var x = vector[0]
    var y = vector[1]
    var z = vector[2]
    var lat = 90 - (Math.acos(z / radius)) * 180 / Math.PI
    var lon = ((270 + (Math.atan2(x , y)) * 180 / Math.PI) % 360) -180
    if(!isNaN(lat) && !isNaN(lon)){
      return [lat, lon]
    } else{
      return []
    }
  },

  sortedUniversalTimes: function(positionData){
    var positionDataKeys = Object.keys(positionData)
    return positionDataKeys.map(function(x){return parseFloat(x)}).sortBy(function(x){ x }).reverse()
  },

  orbitalClearanceDistance: function(positionData){
    return this.rootReferenceBody(positionData).radius + this.datalink.getOrbitalBodyInfo(this.rootReferenceBodyName).atmosphericRadius
  },

  rootReferenceBody: function(positionData){
    return positionData.referenceBodies[this.rootReferenceBodyName]
  }
})