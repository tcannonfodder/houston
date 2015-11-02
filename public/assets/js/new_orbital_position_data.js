var NewOrbitalPositionData = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink
    this.initializeDatalink()
    this.timeoutRate = 5000 //times out every 5 seconds
    this.mutexTimestamp = null
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
      "vesselCurrentPosition": { "trueAnomaly" : null, "relativePosition": null },
    })
    this.getTrueAnomaliesAndReferenceBodies(data)
  },

  getTrueAnomaliesAndReferenceBodies: function(positionData){
    var requestParams = {};
    //ask for the true position for the current body right now and the radius
    var referenceBody = this.datalink.getOrbitalBodyInfo(positionData["vesselBody"])
    requestParams["currentReferenceBodyRadius"] = 'b.radius[' + referenceBody.id + ']'
    requestParams["currentReferenceBodyTruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + positionData["currentUniversalTime"] + ']'
    //ask for the true anomaly of the vessel in the current orbit patch at the current time
    requestParams["vesselCurrentPositionTrueAnomaly"] = "o.trueAnomalyAtUTForOrbitPatch[" + 0 +","+ positionData["currentUniversalTime"] + "]"

    this.buildTrueAnomalyRequestsForOrbitPatches(requestParams, "vesselCurrentOrbit", positionData['o.orbitPatches'])
    if(positionData['tar.o.orbitPatches']){
      this.buildTrueAnomalyRequestsForOrbitPatches(requestParams, "targetCurrentOrbit", positionData['tar.o.orbitPatches'], 'tar.o')
    }

    this.datalink.sendMessage(requestParams, function(data){
      positionData["currentReferenceBodyRadius"] = data["currentReferenceBodyRadius"]
      positionData["currentReferenceBodyTruePosition"] = data["currentReferenceBodyTruePosition"]
      positionData["vesselCurrentPosition"]["trueAnomaly"] = data["vesselCurrentPositionTrueAnomaly"]
      this.buildTrueAnomalyPositionDataForOrbitPatches(data, positionData, "vesselCurrentOrbit", "o.orbitPatches")

      if(positionData['tar.o.orbitPatches']){
        this.buildTrueAnomalyPositionDataForOrbitPatches(data, positionData, "targetCurrentOrbit", "tar.o.orbitPatches")
      }

      this.buildReferenceBodyPositionData(data, positionData)
      this.getRelativePositionsAndRecalculate(positionData)
    }.bind(this))
  },

  getRelativePositionsAndRecalculate: function(positionData){
    var requestParams = {}

    //ask for the current relative position of the vessel
    requestParams["vesselCurrentPositionRelativePosition"] = "o.relativePositionAtTrueAnomalyForOrbitPatch[" + 0 +","+ positionData["vesselCurrentPosition"]["trueAnomaly"] + "]"

    this.buildRelativePositionRequestsForOrbitPatches(requestParams, "vesselCurrentOrbit", positionData['o.orbitPatches'])

    if(positionData['tar.o.orbitPatches']){
      this.buildRelativePositionRequestsForOrbitPatches(requestParams, "targetCurrentOrbit", positionData['tar.o.orbitPatches'], 'tar.o')
    }

    this.datalink.sendMessage(requestParams, function(data){
      positionData["vesselCurrentPosition"]["relativePosition"] = data["vesselCurrentPositionRelativePosition"]
      this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, "vesselCurrentOrbit", 'o.orbitPatches')

      if(positionData['tar.o.orbitPatches']){
        this.buildRelativePositionPositionDataForOrbitPatches(data, positionData, "targetCurrentOrbit", 'tar.o.orbitPatches', 'tar.o')
      }
      this.mutexUnlock()
      this.options.onRecalculate && this.options.onRecalculate(positionData)
    }.bind(this))
  },

  buildTrueAnomalyRequestsForOrbitPatches: function(requestParams, orbitPatchType, orbitPatches, requestPrefix){
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
        requestParams[orbitPatchType + "[" + i + "][" + UTForInterval + "]TrueAnomaly"] = requestPrefix + ".trueAnomalyAtUTForOrbitPatch[" + i +","+ UTForInterval + "]"
        requestParams[orbitPatch["referenceBody"] + "["+ UTForInterval +"]TruePosition"] = 'b.o.truePositionAtUT[' + referenceBody.id + ',' + UTForInterval + ']'
      }
    }
  },

  buildRelativePositionRequestsForOrbitPatches: function(requestParams, orbitPatchType, orbitPatches, requestPrefix){
    requestPrefix = requestPrefix || 'o'
    for (var i = 0; i < orbitPatches.length; i++) {
      var orbitPatch = orbitPatches[i]

      var universalTimes = Object.keys(orbitPatch["positionData"])

      for (var j = universalTimes.length - 1; j >= 0; j--) {
        var universalTime = universalTimes[j]
        var trueAnomaly = orbitPatch["positionData"][universalTime]["trueAnomaly"]
        requestParams[orbitPatchType + "[" + i + "][" + universalTime + "]RelativePosition"] = requestPrefix + ".relativePositionAtTrueAnomalyForOrbitPatch[" + i +","+ trueAnomaly + "]"
      }
    }
  },

  buildTrueAnomalyPositionDataForOrbitPatches: function(rawData, positionData, orbitPatchType, orbitPatchesKey){
    var trueAnomalyFieldRegex = new RegExp(orbitPatchType + "\\[(\\d+)\\]\\[([\\d\\.]+)\\]TrueAnomaly")
    var orbitPatches = positionData[orbitPatchesKey] = positionData[orbitPatchesKey] || {}

    var rawDataKeys = Object.keys(rawData)
    for (var i = rawDataKeys.length - 1; i >= 0; i--) {
      var key = rawDataKeys[i]
      if(trueAnomalyFieldRegex.test(key)){
        var matchParts = trueAnomalyFieldRegex.exec(key)
        var orbitPatchIndex = parseInt(matchParts[1])
        var universalTime = matchParts[2]
        var trueAnomaly = rawData[key]
        var orbitPatch = orbitPatches[orbitPatchIndex] = orbitPatches[orbitPatchIndex] || {}
        var orbitPatchPositionData = orbitPatch["positionData"] = orbitPatch["positionData"] || {}
        orbitPatchPositionData[universalTime] = orbitPatch[universalTime] || {}
        orbitPatchPositionData[universalTime]["trueAnomaly"] = trueAnomaly
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

  adjustUniversalTime: function(ut){
    return ut//.toFixed(3)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.orbitPatches', 't.universalTime', 'v.body',
      'tar.o.orbitPatches'
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },
})