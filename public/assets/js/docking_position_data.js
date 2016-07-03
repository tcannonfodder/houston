var DockingPositionData = Class.create({
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
      "targetBody": data['tar.o.orbitingBody'],
      "vesselCurrentPosition": { "relativePosition": null },
      "targetCurrentPosition": { "relativePosition": null },
    })
    this.getPositionsAndRecalculate(data)
  },

  getPositionsAndRecalculate: function(positionData){
    var requestParams = {};

    var vesselBody = this.datalink.getOrbitalBodyInfo(positionData["vesselBody"])
    requestParams["vesselBodyTruePosition"] = 'b.o.truePositionAtUT[' + vesselBody.id + ',' + positionData["currentUniversalTime"] + ']'

    requestParams["vesselRelativePosition"] = "o.relativePositionAtUTForOrbitPatch[" + 0 +","+ positionData["currentUniversalTime"] + "]"


    if(positionData['tar.type']){
      if(positionData['tar.o.orbitPatches'] && positionData['tar.o.orbitPatches'].length > 0){
        var targetBody = this.datalink.getOrbitalBodyInfo(positionData["targetBody"])
        requestParams["targetBodyTruePosition"] = 'b.o.truePositionAtUT[' + targetBody.id + ',' + positionData["currentUniversalTime"] + ']'

        requestParams["targetRelativePosition"] = "tar.o.relativePositionAtUTForOrbitPatch[" + 0 +","+ positionData["currentUniversalTime"] + "]"
      } else{
        var body = this.datalink.getOrbitalBodyInfo(positionData['tar.name'])
        requestParams["targetTruePosition"] = 'b.o.truePositionAtUT[' + body.id + ',' + positionData["currentUniversalTime"] + ']'
      }
    }

    this.datalink.sendMessage(requestParams, function(data){
      positionData["vesselCurrentPosition"]["truePosition"] = this.truePositionForRelativePosition(
        data["vesselRelativePosition"], data["vesselBodyTruePosition"]
      )

      if(positionData['tar.type']){
        if(positionData['tar.o.orbitPatches']){
          positionData["targetCurrentPosition"]["truePosition"] = this.truePositionForRelativePosition(
            data["targetRelativePosition"], data["targetBodyTruePosition"]
          )
        } else{
          positionData["targetCurrentPosition"]["truePosition"] = data["targetTruePosition"]
        }
      }

      this.mutexUnlock()
      this.options.onRecalculate && this.options.onRecalculate(positionData)
    }.bind(this))
  },

  truePositionForRelativePosition: function(relativePositionVector, frameOfReferenceVector){
    var transformedRelativePositionVector = [
      relativePositionVector[0],
      relativePositionVector[2],
      relativePositionVector[1],
    ]

    return Math.matrixAdd(frameOfReferenceVector, transformedRelativePositionVector)
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