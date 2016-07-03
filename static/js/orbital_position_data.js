var OrbitalPositionData = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink
    this.initializeDatalink()
    this.timeoutRate = 1000 //times out every 5 seconds
    this.mutexTimestamp = null
    this.rootReferenceBody = null
    this.options = Object.extend({
      onRecalculate: null,
      numberOfSegments: 120
    }, options)
  },

  isLocked: function(){
    this.mutexTimestamp && this.mutexTimestamp < ((Date.now() / 1000 | 0) + this.timeoutRate)
  },

  mutexLock: function(){
    this.mutexTimestamp = Date.now()
  },

  mutexUnlock: function(){
    this.mutexTimestamp = null
  },

  recalculate: function(data){
    if(this.isLocked()){return}
    this.mutexLock()
    Object.extend(data, {
      "currentUniversalTime": this.adjustUniversalTime(data['t.universalTime']),
      "vesselBody": data['v.body'],
      "vesselCurrentPosition": { "relativePosition": null },
      "targetCurrentPosition": { "relativePosition": null },
    })
    this.getPositionsAndRecalculate(data)
  },

  getPositionsAndRecalculate: function(positionData){
    var requestParams = {};
    //ask for the true position for the current body right now and the radius
    var referenceBody = this.datalink.getOrbitalBodyInfo(positionData["vesselBody"])
    this.rootReferenceBody = referenceBody
    requestParams["currentReferenceBodyRadius"] = 'b.radius[' + referenceBody.id + ']'
    requestParams["currentReferenceBodyTruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + positionData["currentUniversalTime"] + ']'
    //ask for the relative position of the vessel in the current orbit patch at the current time
    requestParams["vesselCurrentPositionRelativePosition"] = "o.relativePositionAtUTForOrbitPatch[" + 0 +","+ positionData["currentUniversalTime"] + "]"

    this.buildRelativePositionRequestsForOrbitPatches(requestParams, "vesselCurrentOrbit", positionData['o.orbitPatches'], positionData["currentUniversalTime"])
    this.buildRelativePositionRequestsForManeuverNodeOrbitPatches(requestParams, "vesselManeuverNodes", positionData['o.maneuverNodes'], positionData["currentUniversalTime"])

    if(positionData['tar.type']){
      if(positionData['tar.o.orbitPatches'] && positionData['tar.o.orbitPatches'].length > 0){
        this.buildRelativePositionRequestsForOrbitPatches(requestParams, "targetCurrentOrbit", positionData['tar.o.orbitPatches'], positionData["currentUniversalTime"], 'tar.o')
        requestParams["targetCurrentPositionRelativePosition"] = "tar.o.relativePositionAtUTForOrbitPatch[" + 0 +","+ positionData["currentUniversalTime"] + "]"
      } else{
        var body = this.datalink.getOrbitalBodyInfo(positionData['tar.name'])
        requestParams[body.name + "[metadata]radius"] = 'b.radius[' + body.id + ']'
        requestParams[body.name + "["+ positionData["currentUniversalTime"] +"]TruePosition"] = 'b.o.truePositionAtUT[' + body.id + ',' + positionData["currentUniversalTime"] + ']'
        requestParams[body.name + "[metadata]currentTruePosition"] = 'b.o.truePositionAtUT[' + body.id + ',' + positionData["currentUniversalTime"] + ']'
      }
    }

    this.datalink.sendMessage(requestParams, function(data){
      positionData["currentReferenceBodyRadius"] = data["currentReferenceBodyRadius"]
      positionData["currentReferenceBodyTruePosition"] = data["currentReferenceBodyTruePosition"]

      this.buildReferenceBodyPositionData(data, positionData)
      this.buildReferenceBodyMetadata(data, positionData)

      positionData["vesselCurrentPosition"]["relativePosition"] = data["vesselCurrentPositionRelativePosition"]
      this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, "vesselCurrentOrbit", 'o.orbitPatches')

      if(positionData['o.maneuverNodes']){
        this.buildRelativePositionPositionDataForManeuverNodeOrbitPatches(data, positionData, "vesselManeuverNodes", 'o.maneuverNodes')
      }

      if(positionData['tar.o.orbitPatches']){
        this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, "targetCurrentOrbit", 'tar.o.orbitPatches', 'tar.o')
        positionData["targetCurrentPosition"]["relativePosition"] = data["targetCurrentPositionRelativePosition"]
      }

      this.mutexUnlock()
      this.options.onRecalculate && this.options.onRecalculate(positionData)
    }.bind(this))
  },

  buildRelativePositionRequestsForOrbitPatches: function(requestParams, orbitPatchType, orbitPatches, currentUniversalTime, requestPrefix){
    requestPrefix = requestPrefix || 'o'
    for (var i = 0; i < orbitPatches.length; i++) {
      var orbitPatch = orbitPatches[i]

      // get the start and the end universal times for the patch
      var startUT = this.adjustUniversalTime(orbitPatch["startUT"])
      var endUT = this.adjustUniversalTime(orbitPatch["endUT"])

      //ask for the true position for the current body right now and the radius
      var referenceBody = this.datalink.getOrbitalBodyInfo(orbitPatch["referenceBody"])

      var timeInterval = (endUT-startUT)/this.options.numberOfSegments
      var UTForInterval = null
      for(var j = 0; j < this.options.numberOfSegments; j++){
        UTForInterval = this.adjustUniversalTime(startUT  + (timeInterval * j))
        if(UTForInterval > endUT){
          UTForInterval = endUT
        }

        //get the true position of the root reference body at this UT as well
        requestParams[this.rootReferenceBody.name + "["+ UTForInterval +"]TruePosition"] = 'b.o.truePositionAtUT[' + this.rootReferenceBody.id + ',' + UTForInterval + ']'

        requestParams[orbitPatchType + "[" + i + "][" + UTForInterval + "]RelativePosition"] = requestPrefix + ".relativePositionAtUTForOrbitPatch[" + i +","+ UTForInterval + "]"
        requestParams[orbitPatch["referenceBody"] + "["+ UTForInterval +"]TruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + UTForInterval + ']'
      }

      requestParams[orbitPatch["referenceBody"] + "[metadata]radius"] = 'b.radius[' + referenceBody.id + ']'
      requestParams[orbitPatch["referenceBody"] + "[metadata]currentTruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + currentUniversalTime + ']'
    }
  },

  buildRelativePositionRequestsForManeuverNodeOrbitPatches: function(requestParams, maneuverNodeType, maneuverNodes, currentUniversalTime){
    var requestPrefix = "o.maneuverNodes.relativePositionAtUTForManeuverNodesOrbitPatch"
    for (var i = 0; i < maneuverNodes.length; i++) {
      var maneuverNode = maneuverNodes[i]

      /*
      "apistring": "o.maneuverNodes.relativePositionAtUTForManeuverNodesOrbitPatch",
      "name": "For a maneuver node, The orbit patch's True Anomaly at Universal Time [int id, orbit patch index, universal time]",
      "units": "DEG",
      "plotable": true
      */

      var labelPrefix = maneuverNodeType + "[" + i + "]"

      for (var j = 0; j < maneuverNode['orbitPatches'].length; j++) {
        var orbitPatch = maneuverNode['orbitPatches'][j]

        // get the start and the end universal times for the patch
        var startUT = this.adjustUniversalTime(orbitPatch["startUT"])
        var endUT = this.adjustUniversalTime(orbitPatch["endUT"])
        var period = this.adjustUniversalTime(orbitPatch["period"])
        var endTransition = this.adjustUniversalTime(orbitPatch["patchEndTransition"])

        //ask for the true position for the current body right now and the radius
        var referenceBody = this.datalink.getOrbitalBodyInfo(orbitPatch["referenceBody"])
        var expectedUT = startUT + period

        if(expectedUT < endUT && endTransition == "MANEUVER"){
          var timeInterval = (expectedUT - startUT)/this.options.numberOfSegments
        } else{
          var timeInterval = (endUT-startUT)/this.options.numberOfSegments
        }

        var UTForInterval = null
        for(var k = 0; k < this.options.numberOfSegments; k++){
          UTForInterval = this.adjustUniversalTime((UTForInterval || startUT) + timeInterval)
          if(UTForInterval > endUT){
            UTForInterval = endUT
          }

          var args = [i,j,UTForInterval]

          //get the true position of the root reference body at this UT as well
          requestParams[this.rootReferenceBody.name + "["+ UTForInterval +"]TruePosition"] = 'b.o.truePositionAtUT[' + this.rootReferenceBody.id + ',' + UTForInterval + ']'

          requestParams[labelPrefix + "[" + j + "][" + UTForInterval + "]RelativePosition"] = requestPrefix + "[" + args.join(',') + "]"
          requestParams[orbitPatch["referenceBody"] + "["+ UTForInterval +"]TruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + UTForInterval + ']'
        }

        requestParams[orbitPatch["referenceBody"] + "[metadata]radius"] = 'b.radius[' + referenceBody.id + ']'
        requestParams[orbitPatch["referenceBody"] + "[metadata]currentTruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + currentUniversalTime + ']'
      }
    };
  },

  buildRelativePositionPositionDataForOrbitPatches: function(rawData, positionData, orbitPatchType, orbitPatchesKey){
    var relativePositionFieldRegex = new RegExp(orbitPatchType + "\\[(\\d+)\\]\\[([\\d\\.]+)\\]RelativePosition")
    var orbitPatches = positionData[orbitPatchesKey] = positionData[orbitPatchesKey] || {}

    var rawDataKeys = Object.keys(rawData)
    for (var i = rawDataKeys.length - 1; i >= 0; i--) {
      var key = rawDataKeys[i]
      if(relativePositionFieldRegex.test(key)){
        var matchParts = relativePositionFieldRegex.exec(key)
        var orbitPatchIndex = parseInt(matchParts[1])
        var universalTime = matchParts[2]
        var relativePosition = rawData[key]

        var orbitPatch = orbitPatches[orbitPatchIndex] = orbitPatches[orbitPatchIndex] || {}
        var orbitPatchPositionData = orbitPatch["positionData"] = orbitPatch["positionData"] || {}
        orbitPatchPositionData[universalTime] = orbitPatchPositionData[universalTime] || {}
        orbitPatchPositionData[universalTime]["relativePosition"] = relativePosition
      }
    };
  },

  buildRelativePositionPositionDataForManeuverNodeOrbitPatches: function(rawData, positionData, maneuverNodeType, maneuverNodesKey){
    var relativePositionFieldRegex = new RegExp(maneuverNodeType + "\\[(\\d+)\\]\\[(\\d+)\\]\\[([\\d\\.]+)\\]RelativePosition")
    var maneuverNodes = positionData[maneuverNodesKey] = positionData[maneuverNodesKey] || {}

    var rawDataKeys = Object.keys(rawData)
    for (var i = rawDataKeys.length - 1; i >= 0; i--) {
      var key = rawDataKeys[i]
      if(relativePositionFieldRegex.test(key)){
        var matchParts = relativePositionFieldRegex.exec(key)
        var maneuverNodeIndex = parseInt(matchParts[1])
        var orbitPatchIndex = parseInt(matchParts[2])
        var universalTime = matchParts[3]
        var relativePosition = rawData[key]

        var orbitPatch = maneuverNodes[maneuverNodeIndex]['orbitPatches'][orbitPatchIndex] = maneuverNodes[maneuverNodeIndex]['orbitPatches'][orbitPatchIndex] || {}
        var orbitPatchPositionData = orbitPatch["positionData"] = orbitPatch["positionData"] || {}
        orbitPatchPositionData[universalTime] = orbitPatchPositionData[universalTime] || {}
        orbitPatchPositionData[universalTime]["relativePosition"] = relativePosition
      }
    };
  },

  buildReferenceBodyPositionData: function(rawData, positionData){
    var referenceBodyTruePositionRegex = new RegExp(/(\w+)\[([\d\.]+)\]TruePosition$/)

    var rawDataKeys = Object.keys(rawData)
    for (var i = rawDataKeys.length - 1; i >= 0; i--) {
      var key = rawDataKeys[i]
      if(referenceBodyTruePositionRegex.test(key)){
        var matchParts = referenceBodyTruePositionRegex.exec(key)
        var referenceBodyName = matchParts[1]
        var universalTime = matchParts[2]
        var truePosition = rawData[key]

        var referenceBodies = positionData["referenceBodies"] = positionData["referenceBodies"] || {}
        var referenceBodyObject = referenceBodies[referenceBodyName] = referenceBodies[referenceBodyName] || {}
        referenceBodyObject["positionData"] = referenceBodyObject["positionData"] || {}
        referenceBodyObject["positionData"][universalTime] = referenceBodyObject["positionData"][universalTime] || {}
        referenceBodyObject["positionData"][universalTime]["truePosition"] = truePosition
      }
    }
  },

  buildReferenceBodyMetadata: function(rawData, positionData){
    var referenceBodyTruePositionRegex = new RegExp(/(\w+)\[metadata\](\w+)$/)

    var rawDataKeys = Object.keys(rawData)
    for (var i = rawDataKeys.length - 1; i >= 0; i--) {
      var key = rawDataKeys[i]
      if(referenceBodyTruePositionRegex.test(key)){
        var matchParts = referenceBodyTruePositionRegex.exec(key)
        var referenceBodyName = matchParts[1]
        var field = matchParts[2]
        var data = rawData[key]

        var referenceBodies = positionData["referenceBodies"] = positionData["referenceBodies"] || {}
        var referenceBodyObject = referenceBodies[referenceBodyName] = referenceBodies[referenceBodyName] || {}
        referenceBodyObject[field] = data
      }
    }
  },

  adjustUniversalTime: function(ut){
    return ut//.toFixed(3)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.orbitPatches', 't.universalTime', 'v.body',
      'tar.name', 'tar.type', 'tar.o.orbitingBody',
      'tar.o.orbitPatches', 'o.maneuverNodes'
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },
})