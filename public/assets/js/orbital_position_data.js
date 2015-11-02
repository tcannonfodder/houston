var OrbitalPositionData = Class.create({
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
    var requestParams = {}
    //load the vessel's current body
    ver referenceBody = this.datalink.getOrbitalBodyInfo(positionData["vesselBody"])
    requestParams["currentReferenceBodyRadius"] = 'b.radius[' + referenceBody.id + ']'
    this.findOrCreateReferenceBody(requestData, positionData["vesselBody"])
    //ask for the true position for the body right now
    this.addUniversalTimeToReferenceBody(requestData, positionData["vesselBody"], positionData["currentUniversalTime"])
    debugger
    //ask for the true anomaly of the vessel in the current orbit patch at the current time
    requestData["vesselCurrentPosition"]["universalTimeForTrueAnomaly"] = positionData["currentUniversalTime"]

    console.log(requestData)
    debugger



    var serializedFields = this.serializeDataForPositions(positionData)

    this.datalink.sendMessage(serializedFields, function(data){
      // console.log(data)
      var deserializedData = this.deserializePositionData(data);
      console.log(deserializedData)
      debugger
      // console.log("FINISHED")
      //this.getOrbitPatchesDetails(dataForPositions, deserializedData)
    }.bind(this))
  },


  getOrbitPatchesBounds: function(dataForPositions){
    //collect all the reference bodies from all orbit patches
    this.addReferenceBodiesForOrbitalPatch(dataForPositions, dataForPositions['o.orbitPatches'])

    for (var i = 0; i < dataForPositions['o.orbitPatches'].length; i++) {
      var orbitPatch = dataForPositions['o.orbitPatches'][i]
      this.addOrbitPatchBounds(dataForPositions, orbitPatch, "vesselOrbitPatches", i)
    };

    // for (var i = 0; i < 10; i++) {
    //   this.addUniversalTimeToReferenceBody(data, "Kerbin", data['t.universalTime'] + (i * 10))
    // };

    // console.log(dataForPositions)

    var serializedFields = this.serializeDataForPositions(dataForPositions)

    this.datalink.sendMessage(serializedFields, function(data){
      // console.log(data)
      var deserializedData = this.deserializePositionData(data);
      // console.log(deserializedData)
      // console.log("FINISHED")
      this.getOrbitPatchesDetails(dataForPositions, deserializedData)
    }.bind(this))
  },

  getOrbitPatchesDetails: function(dataForPositions, orbitalBoundsData){
    for (var i = 0; i < dataForPositions['o.orbitPatches'].length; i++) {
      var orbitPatch = dataForPositions['o.orbitPatches'][i]
      this.addOrbitPatchDetails(dataForPositions, orbitalBoundsData, orbitPatch, "vesselOrbitPatches", i)
    }

    // console.log(dataForPositions)

    var serializedFields = this.serializeDataForPositions(dataForPositions)

    this.datalink.sendMessage(serializedFields, function(data){
      // console.log(data)
      var deserializedData = this.deserializePositionData(data);
      console.log(deserializedData)
      // console.log("DETAILS GOT")
      this.options.onRecalculate && this.options.onRecalculate(dataForPositions, deserializedData)
      this.mutexUnlock()
    }.bind(this))
  },

  addReferenceBodiesForOrbitalPatch: function(dataForPositions, orbitalPatches){
    // get all the reference bodies in the orbital patches
    for (var i = 0; i < orbitalPatches.length; i++) {
      var orbitalPatch = orbitalPatches[i];
      var referenceBody = this.datalink.getOrbitalBodyInfo(orbitalPatch["referenceBody"])
      if(dataForPositions["referenceBodies"][referenceBody.id]){ continue; }

      dataForPositions["referenceBodies"][referenceBody.id] = {
        "properties": ["radius"],
        "universalTimesForTruePostions": []
      }
    };
  },

  addOrbitPatchBounds: function(dataForPositions, orbitPatch, type, index){
    //Add the starting and ending universal times from this orbit patch to the
    //list to get for the reference body
    this.addUniversalTimeToReferenceBody(dataForPositions, orbitPatch["referenceBody"], orbitPatch["startUT"])
    this.addUniversalTimeToReferenceBody(dataForPositions, orbitPatch["referenceBody"], orbitPatch["endUT"])

    var dataForPatch = dataForPositions[type][index] = dataForPositions[type][index] || this.buildOrbitPatchData()
    //ask for the true anomalies for the start/stop universal times
    dataForPatch["universalTimesForTrueAnomalies"].push(orbitPatch["startUT"])
    dataForPatch["universalTimesForTrueAnomalies"].push(orbitPatch["endUT"])

    //ask for the universal time for when the true anomaly is 0
    dataForPatch["trueAnomaliesForUniversalTimes"].push(0)
  },

  addOrbitPatchDetails: function(dataForPositions, orbitalBoundsData, orbitPatch, type, index){
    var startTrueAnomaly, endTrueAnomaly
    var universalTime = dataForPositions["universalTime"]
    var startUT = orbitPatch["startUT"]
    var endUT = orbitPatch["endUT"]

    var dataForPatch = dataForPositions[type][index] = dataForPositions[type][index] || this.buildOrbitPatchData()

    if(orbitPatch["patchEndTransition"] != "FINAL"){
      startTrueAnomaly = orbitalBoundsData[type][index]["trueAnomalyAtUT"][startUT]
      endTrueAnomaly = orbitalBoundsData[type][index]["trueAnomalyAtUT"][endUT]
      if(endTrueAnomaly < startTrueAnomaly){
        endTrueAnomaly += 2.0 * Math.PI
      }
    } else{
      startTrueAnomaly = 0//orbitalBoundsData[type][index]["universalTimeAtTrueAnomaly"]
      endTrueAnomaly = startTrueAnomaly + 2 * Math.PI
    }

    var deltaTheta = (endTrueAnomaly - startTrueAnomaly)/this.options.numberOfSegments
    var theta = startTrueAnomaly
    var timeAtTrueAnomaly = startUT
    var deltaUniversalTime = (endUT - startUT)/this.options.numberOfSegments
    for (var i = 0; i < this.options.numberOfSegments; i++) {
      dataForPatch["trueAnomaliesForRelativePositions"].push(theta)
      this.addUniversalTimeToReferenceBody(dataForPositions, orbitPatch["referenceBody"], timeAtTrueAnomaly)
      this.addUniversalTimeToReferenceBody(dataForPositions, dataForPositions["vesselBody"], timeAtTrueAnomaly)
      dataForPatch["trueAnomaliesForRelativePositions"].push(theta)

      theta += deltaTheta
      timeAtTrueAnomaly += deltaUniversalTime
    };
  },

  addUniversalTimeToReferenceBody: function(dataForPositions, referenceBodyName, universalTime){
    var referenceBody = this.datalink.getOrbitalBodyInfo(referenceBodyName)
    dataForPositions["referenceBodies"][referenceBody.id]["universalTimesForTruePostions"].push(universalTime)
  },

  serializeDataForPositions: function(dataForPositions){
    var fields = {}

    // serialize the reference bodies data
    Object.extend(fields, this.serializeReferenceBodiesData(dataForPositions["referenceBodies"]))
    Object.extend(fields, this.serializeOrbitPatchesData(
      dataForPositions["vesselOrbitPatches"],
      "vesselOrbitPatches", 'o'
    ))
    // console.log(fields)
    return fields
  },

  serializeReferenceBodiesData: function(referenceBodies){
    var fields = {}
    var referenceBodyIds = Object.keys(referenceBodies)
    for (var i = referenceBodyIds.length - 1; i >= 0; i--) {
      var referenceBodyId = referenceBodyIds[i]
      var referenceBody = referenceBodies[referenceBodyId]
      var baseFieldString = "referenceBodies[" + referenceBodyId + "]"

      for (var i = referenceBody["properties"].length - 1; i >= 0; i--) {
        var fieldString = baseFieldString + "[" + referenceBody["properties"][i] + "]"
        fields[fieldString] = 'b.radius[' + referenceBodyId + ']'
      };

      for (var i = referenceBody["universalTimesForTruePostions"].length - 1; i >= 0; i--) {
        var universalTime = referenceBody["universalTimesForTruePostions"][i]
        var fieldString = baseFieldString + "[truePositionAtUT][" + universalTime + "]"
        fields[fieldString] = 'b.o.truePositionAtUT[' + referenceBodyId + ',' + universalTime + ']'
      };
    };

    return fields;
  },

  serializeOrbitPatchesData: function(orbitPatches, type, fieldPrefix){
    var fields = {}
    var orbitPatchIndexes = Object.keys(orbitPatches)
    for (var i = orbitPatchIndexes.length - 1; i >= 0; i--) {
      var orbitPatchIndex = orbitPatchIndexes[i]
      var orbitPatch = orbitPatches[orbitPatchIndex]
      var baseFieldString = type + "[" + orbitPatchIndex + "]"

      for (var i = orbitPatch["universalTimesForTrueAnomalies"].length - 1; i >= 0; i--) {
        var universalTime = orbitPatch["universalTimesForTrueAnomalies"][i]
        var fieldString = baseFieldString + "[trueAnomalyAtUT][" + universalTime + "]"
        fields[fieldString] = fieldPrefix + ".trueAnomalyAtUTForOrbitPatch[" + orbitPatchIndex +","+ universalTime + "]"
      }

      for (var i = orbitPatch["trueAnomaliesForUniversalTimes"].length - 1; i >= 0; i--) {
        var trueAnomaly = orbitPatch["trueAnomaliesForUniversalTimes"][i]
        var fieldString = baseFieldString + "[universalTimeAtTrueAnomaly][" + trueAnomaly + "]"
        fields[fieldString] = fieldPrefix + ".UTForTrueAnomalyForOrbitPatch[" + orbitPatchIndex +","+ trueAnomaly + "]"
      }

      for (var i = orbitPatch["trueAnomaliesForRelativePositions"].length - 1; i >= 0; i--) {
        var trueAnomaly = orbitPatch["trueAnomaliesForRelativePositions"][i]
        var fieldString = baseFieldString + "[relativePositionAtTrueAnomaly][" + trueAnomaly + "]"
        fields[fieldString] = fieldPrefix + ".relativePositionAtTrueAnomalyForOrbitPatch[" + orbitPatchIndex +","+ trueAnomaly + "]"
      }
    }

    return fields;
  },

  deserializePositionData: function(data){
    var positionData = {
      "referenceBodies" : {}, "universalTime": data['t.universalTime'],
      "vesselOrbitPatches": {}, "maneuverNodesOrbitPatches": [],
      "targetOrbitPatches": {}
    }

    Object.keys(data).forEach(function(key){
      this.deserializeReferenceBodyField(positionData, key, data[key])
      this.deserializeOrbitPatchesField(positionData, key, data[key])
    }.bind(this))

    return positionData
  },

  /* REGEXES USED TO DESERIALIZE. DEFINED GLOBALLY TO IMPROVE PERFORMANCE */

  referenceBodiesFieldRegex: /^referenceBodies\[(\d+)\]/,
  referenceBodiesPropertiesFieldRegex: /^referenceBodies\[\d+\]\[(\w+)\]$/,
  referenceBodiesTruePositionsFieldRegex: /^referenceBodies\[\d+\]\[truePositionAtUT\]\[([\d\.]+)\]$/,

  orbitPatchesFieldRegex: /^(\w+)OrbitPatches\[(\d+)\]/,
  orbitPatchesDataFieldRegex: /^(\w+)OrbitPatches\[(\d+)\]\[(\w+)\]\[([^\]]+)\]$/,

  deserializeReferenceBodyField: function(positionData, key, value){
    var fieldMatches = this.referenceBodiesFieldRegex.exec(key)
    if(fieldMatches == null){ return }

    //Setup the reference bodies object if it doesn't exist
    var referenceBody = positionData["referenceBodies"][fieldMatches[1]] = positionData["referenceBodies"][fieldMatches[1]] || {
      "properties" : {},
      "truePositionAtUT": {}
    }

    //Now to actually parse this field
    var truePositionFieldMatches = this.referenceBodiesTruePositionsFieldRegex.exec(key)
    if(truePositionFieldMatches != null){
      referenceBody["truePositionAtUT"][truePositionFieldMatches[1]] = value
    }

    var propertyFieldMatches = this.referenceBodiesPropertiesFieldRegex.exec(key)
    if(propertyFieldMatches != null){
      referenceBody["properties"][propertyFieldMatches[1]] = value
    }
  },

  deserializeOrbitPatchesField: function(positionData, key, value){
    var fieldMatches = this.orbitPatchesFieldRegex.exec(key)
    if(fieldMatches == null){ return }

    //Setup the orbit patch object if it doesn't exist
    var orbitPatchType = fieldMatches[1] + "OrbitPatches"
    var orbitPatch = positionData[orbitPatchType][fieldMatches[2]] = positionData[orbitPatchType][fieldMatches[2]] || {
      "trueAnomalyAtUT" : {},
      "universalTimeAtTrueAnomaly": {},
      "relativePositionAtTrueAnomaly": {},
    }

    //Now to actually parse this field
    var dataFieldMatches = this.orbitPatchesDataFieldRegex.exec(key)
    if(dataFieldMatches != null){
      orbitPatch[dataFieldMatches[3]][dataFieldMatches[4]] = value
    }
  },

  buildOrbitPatchData: function(){
    return {
      "universalTimesForTrueAnomalies": [],
      "trueAnomaliesForUniversalTimes": [],
      "trueAnomaliesForRelativePositions": [],
    }
  },

  findOrCreateReferenceBody: function(positionData, name){
    var referenceBody = this.datalink.getOrbitalBodyInfo(name)

    if(!positionData["referenceBodies"][referenceBody.id]){
      positionData["referenceBodies"][referenceBody.id] = {
        "properties": ["radius"],
        "universalTimesForTruePostions": []
      }
    }

    return positionData["referenceBodies"][referenceBody.id]
  },

  adjustUniversalTime: function(ut){
    return ut.toFixed(3)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      'o.orbitPatches', 't.universalTime', 'v.body'
    ])

    this.datalink.addReceiverFunction(this.recalculate.bind(this))
  },
})