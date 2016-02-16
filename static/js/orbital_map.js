var OrbitalMap = Class.create({
  initialize: function(orbitalPositionData, datalink, svgCanvasID){
    this.svgCanvasID = svgCanvasID
    this.svgCanvas = $(svgCanvasID)
    this.initializeSVGCanvas()
    this.buildGroups()
    this.scale = 30000

    this.now = null
    this.currentVessel = null
    this.rootReferenceBody = {"radius": null, "currentTruePosition": null, "name": null}

    this.KSPCoordinateCenter = null

    this.currentVesselSVG = null
    this.currentVesselOrbitSVGs = []
    this.currentVesselManeuverNodeSVGs = []

    this.targetVesselSVG = null
    this.targetVesselOrbitSVGs = []

    this.rootReferenceBodySVG = null
    this.referenceBodySVGs = {}

    this.currentVesselOrbitPathColors = ["#efbc92", "#b4c6f7", "#987cf9", "#6baedb", "#d0f788", "#f774dd", "#9dc3f9", "#edef70", "#f97292", "#adffb6", "#efc9ff", "#bfc0ff", "#ffe3c4", "#8eb2f9", "#83f7b7", "#8cfc8a", "#97f4b5", "#96dff7", "#ffaabe", "#eda371"]
    this.maneuverNodeOrbitPathColors = ["#b4f489", "#f48e77", "#a4d1f2", "#99ffc6", "#fcc2e7", "#99ffc6", "#9d67e5", "#f49ab2", "#ffcc99", "#b7fca4", "#ff7cd1", "#ffc9de", "#a4f9ac", "#b6ff77", "#80e6f2", "#f9bdbb", "#e79bef", "#85f7d5", "#88c4ea", "#68a9d8"]
    this.targetOrbitPathColors = ["#f28cac", "#f7d2a5", "#b4f489", "#f28cac", "#f7d2a5", "#a3ceed", "#f26dd5", "#fcb5fa", "#f77183", "#a7d5ef", "#b4f489", "#9ca6f4", "#f7cea8", "#f9bbc2", "#f48dc1", "#f4ca6e", "#f48e77", "#928be8", "#ef6b8f", "#b074ed"]

    this.currentVesselOrbitPathMarkers = []
    this.maneuverNodeOrbitPathMarkers = []
    this.targetVesselOrbitPathMarkers = []

    this.buildMarkers()

    this.mapAlignmentDetails = {width: 0, height: 0}

    this.datalink = datalink
    this.orbitalPositionData = orbitalPositionData;
    this.orbitalPositionData.options.onRecalculate = this.render.bind(this)
  },

  render: function(positionData){
    this.currentVessel = positionData["vesselCurrentPosition"]
    this.targetVessel = positionData["targetCurrentPosition"]
    this.rootReferenceBody["name"] = positionData["vesselBody"]
    this.rootReferenceBody["radius"] = positionData["currentReferenceBodyRadius"]
    this.rootReferenceBody["currentTruePosition"] = positionData["currentReferenceBodyTruePosition"]
    this.KSPCoordinateCenter = this.rootReferenceBody["currentTruePosition"]

    var referenceBodyPosition = this.positionOnCanvas(this.rootReferenceBody["currentTruePosition"])
    this.rootReferenceBodySVG = this.rootReferenceBodySVG || this.snapSVG.circle(referenceBodyPosition[0],
      referenceBodyPosition[1],
      this.scaleDownKSPValue(this.rootReferenceBody["radius"])
    );

    this.rootReferenceBodySVG.attr({
      fill: 'none',
      stroke: "#000",
      strokeWidth: 5,
      cx: referenceBodyPosition[0],
      cy: referenceBodyPosition[1],
    })

    this.referenceBodiesGroup.add(this.rootReferenceBodySVG)

    //Render any other planetary bodies
    var referenceBodyNames = Object.keys(positionData["referenceBodies"])
    for (var i = referenceBodyNames.length - 1; i >= 0; i--) {
      var name = referenceBodyNames[i]
      if(this.rootReferenceBody["name"] == name){
        continue
      }
      var referenceBody = positionData["referenceBodies"][name]

      var radius = referenceBody["radius"]
      var currentTruePosition = referenceBody["currentTruePosition"]

      var referenceBodyPosition = this.positionOnCanvas(currentTruePosition)

      var referenceBodySVG = this.referenceBodySVGs[name] = this.referenceBodySVGs[name] || this.snapSVG.circle(referenceBodyPosition[0],
        referenceBodyPosition[1],
        this.scaleDownKSPValue(radius)
      );

      referenceBodySVG.attr({
        fill: 'none',
        stroke: "#000",
        strokeWidth: 5,
        cx: referenceBodyPosition[0],
        cy: referenceBodyPosition[1],
      })

      this.referenceBodiesGroup.add(referenceBodySVG)
    }

    // console.log(this.currentVessel["relativePosition"])

    var currentVesselPosition = this.positionOnCanvasForRelativePosition(
      this.currentVessel["relativePosition"],
      this.rootReferenceBody["currentTruePosition"]
    )

    // console.log(currentVesselPosition)

    this.currentVesselSVG = this.currentVesselSVG || this.snapSVG.circle(currentVesselPosition[0],
      currentVesselPosition[1],
      5
    );

    this.currentVesselSVG.attr({
        cx: currentVesselPosition[0],
        cy: currentVesselPosition[1],
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5
    });

    this.vesselsGroup.add(this.currentVesselSVG)

    for (var i = 0; i < positionData["o.orbitPatches"].length; i++) {
      var orbitPatch = positionData["o.orbitPatches"][i]
      var orbitPatchPoints = []
      var orbitPatchPositionData = orbitPatch["positionData"]
      var referenceBody = orbitPatch["referenceBody"]
      var universalTimes = Object.keys(orbitPatchPositionData)

      for (var j = 0; j < universalTimes.length; j++) {
        var universalTime = universalTimes[j]
        var relativePosition = orbitPatchPositionData[universalTime]["relativePosition"]
        var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["currentTruePosition"]

        var point = this.positionOnCanvasForRelativePosition(
          relativePosition,
          truePositionOfReferenceBody
        )

        orbitPatchPoints.push(point)
      };

      this.currentVesselOrbitSVGs[i] = this.currentVesselOrbitSVGs[i] || this.snapSVG.polyline(orbitPatchPoints)
      this.currentVesselOrbitSVGs[i].attr({
        points: orbitPatchPoints,
        fill: 'none',
        stroke: this.currentVesselOrbitPathColors[i],
        strokeWidth: 3
      })

      this.currentVesselOrbitPathsGroup.add(this.currentVesselOrbitSVGs[i])
    };

    //clear out all the maneuver node plots before we render them again in case the
    //points have changed or patches have been added/removed
    for (var i = this.currentVesselManeuverNodeSVGs.length - 1; i >= 0; i--) {
      this.currentVesselManeuverNodeSVGs[i].attr({points: []})
    };

    var svgIndex = 0

    for (var i = 0; i < positionData['o.maneuverNodes'].length; i++) {
      var maneuverNode = positionData['o.maneuverNodes'][i]
      var firstUniversalTimeOfLastOrbitPatch = null

      for (var j = 0; j < maneuverNode["orbitPatches"].length; j++) {
        var orbitPatch = maneuverNode["orbitPatches"][j]
        var orbitPatchPoints = []
        var orbitPatchPositionData = orbitPatch["positionData"]
        var referenceBody = orbitPatch["referenceBody"]
        var universalTimes = Object.keys(orbitPatchPositionData)
        var sortedUniversalTimes = universalTimes.map(function(x){return parseFloat(x)}).sort()

        for (var k = 0; k < sortedUniversalTimes.length; k++) {
          var universalTime = sortedUniversalTimes[k].toString()
          var universalTimeFloat = parseFloat(universalTime)
          var relativePosition = orbitPatchPositionData[universalTime]["relativePosition"]
          var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["currentTruePosition"]

          if(firstUniversalTimeOfLastOrbitPatch && universalTimeFloat < firstUniversalTimeOfLastOrbitPatch){
            continue
          }

          var point = this.positionOnCanvasForRelativePosition(
            relativePosition,
            truePositionOfReferenceBody
          )

          orbitPatchPoints.push(point)
        };

        //Now that all the universal times for this orbit patch have been set to plot, we can tell the next orbit patch to not render
        //anything before this patch (creating a continuous line in the orbital map)
        firstUniversalTimeOfLastOrbitPatch = sortedUniversalTimes[0]

        this.currentVesselManeuverNodeSVGs[svgIndex] = this.currentVesselManeuverNodeSVGs[svgIndex] || this.snapSVG.polyline(orbitPatchPoints)
        this.currentVesselManeuverNodeSVGs[svgIndex].attr({
          points: orbitPatchPoints,
          fill: 'none',
          stroke: this.maneuverNodeOrbitPathColors[svgIndex],
          "stroke-dasharray": '2',
          strokeWidth: 3,
          "marker-start": this.maneuverNodeOrbitPathMarkers[svgIndex-1],
          "marker-end": this.maneuverNodeOrbitPathMarkers[svgIndex],
        })

        this.maneuverNodesOrbitPathsGroup.add(this.currentVesselManeuverNodeSVGs[svgIndex])
        svgIndex++;
      };
    }

    if(this.needsRealigned()){
      var scaleFactor = 0
      if(this.canvasHeight()/orbitalMap.mapGroup.getBBox().height < 1.0){
        scaleFactor = this.canvasHeight()/orbitalMap.mapGroup.getBBox().height
      }

      if(this.canvasWidth()/orbitalMap.mapGroup.getBBox().width < 1.0){
        scaleFactor = this.canvasWidth()/orbitalMap.mapGroup.getBBox().width
      }

      var t = new Snap.Matrix()
      if(scaleFactor > 0){
        t.scale(scaleFactor - .1)
      }
      t.translate(-this.mapGroup.getBBox().x, -this.mapGroup.getBBox().y);
      this.mapGroup.transform(t);

      this.mapAlignmentDetails.width = this.mapGroup.getBBox().width
      this.mapAlignmentDetails.height = this.mapGroup.getBBox().height
    }

    var targetVesselPosition = this.positionOnCanvasForRelativePosition(
      this.targetVessel["relativePosition"],
      this.rootReferenceBody["currentTruePosition"]
    )

    this.targetVesselSVG = this.targetVesselSVG || this.snapSVG.circle(targetVesselPosition[0],
      targetVesselPosition[1],
      5
    );

    this.targetVesselSVG.attr({
        cx: targetVesselPosition[0],
        cy: targetVesselPosition[1],
        fill: "purple",
        stroke: "#000",
        strokeWidth: 5
    });

    if(positionData['tar.o.orbitPatches']){
      for (var i = 0; i < positionData["tar.o.orbitPatches"].length; i++) {
        var orbitPatch = positionData["tar.o.orbitPatches"][i]
        var orbitPatchPoints = []
        var orbitPatchPositionData = orbitPatch["positionData"]
        var referenceBody = orbitPatch["referenceBody"]
        var universalTimes = Object.keys(orbitPatchPositionData)

        for (var i = 0; i < universalTimes.length; i++) {
          var universalTime = universalTimes[i]
          var relativePosition = orbitPatchPositionData[universalTime]["relativePosition"]
          var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["currentTruePosition"]

          var point = this.positionOnCanvasForRelativePosition(
            relativePosition,
            truePositionOfReferenceBody
          )

          orbitPatchPoints.push(point)
        };

        this.targetVesselOrbitSVGs[i] = this.targetVesselOrbitSVGs[i] || this.snapSVG.polyline(orbitPatchPoints)
        this.targetVesselOrbitSVGs[i].attr({
          points: orbitPatchPoints,
          fill: 'none',
          stroke: 'red',
          strokeWidth: 5
        })
      };
    }
  },

  positionOnCanvasForRelativePosition: function(relativePositionVector, referenceBodyPosition){
    return this.positionOnCanvas(math.add(relativePositionVector, referenceBodyPosition))
  },

  // Find the x/y coordinates in the map space that correspond to
  // the given KSP vecor
  positionOnCanvas: function(KSPvector){
    var KSPVectorFromCenter = math.add(KSPvector, math.multiply(-1, this.KSPCoordinateCenter))
    var transformedVector = this.transformVector(KSPVectorFromCenter)

    //scale down the X/Y coordinates to match the bounds in KSP
    var scaledVector = this.scaleDownKSPValue([transformedVector[0], transformedVector[1]])

    //add 1/2 of the width/height to find the position from the center
    return [scaledVector[0] + (this.canvasWidth()/2.0), scaledVector[1] + (this.canvasHeight()/2.0)]
  },

  //figure out a way to transform the 3D vector to 2 dimensions
  transformVector: function(vector){
    var transformedVector = [vector[0],vector[2], vector[1]]
    var degreesInRadians = Math.toRadians(90)

    var rotationMatrixZ = [
      [Math.cos(degreesInRadians), -Math.sin(degreesInRadians), 0],
      [Math.sin(degreesInRadians), Math.cos(degreesInRadians), 0],
      [0, 0, 1]
    ]

    var rotationMatrixY = [
      [Math.cos(degreesInRadians), 0, Math.sin(degreesInRadians)],
      [0, 1, 0],
      [-Math.sin(degreesInRadians), 0, Math.cos(degreesInRadians)]
    ]

    var rotationMatrixX = [
      [1,0,0],
      [0, Math.cos(degreesInRadians), -Math.sin(degreesInRadians)],
      [0, Math.sin(degreesInRadians), Math.cos(degreesInRadians)],
    ]

    var rotatedVector = math.multiply(math.matrix(rotationMatrixX), transformedVector)
    return rotatedVector.toArray()
  },

  //scale down either a scalar value or a matrix to fit the bounds of the scale
  scaleDownKSPValue: function(value){
    return math.multiply(1/this.scale, value)
  },

  canvasWidth: function(){
    return this.svgCanvas.getBoundingClientRect().width
  },

  canvasHeight: function(){
    return this.svgCanvas.getBoundingClientRect().width
  },

  initializeSVGCanvas: function(){
    this.snapSVG = Snap("#" + this.svgCanvasID)
  },

  buildMarkers: function(){
    for (var i = 0; i < this.maneuverNodeOrbitPathColors.length; i++) {
      var color = this.maneuverNodeOrbitPathColors[i];
      this.maneuverNodeOrbitPathMarkers.push(this.snapSVG.rect(1,1,2,5).attr({
        fill: color
      }).marker(0,0,7,7, 2, 4).attr({'orient': 'auto', 'markerUnits': 'strokeWidth', 'viewBox': ""}))
    }
  },

  needsRealigned: function(){
    return Math.ceil(this.mapAlignmentDetails.width) != Math.ceil(this.mapGroup.getBBox().width) ||
      Math.ceil(this.mapAlignmentDetails.height) != Math.ceil(this.mapGroup.getBBox().height)
  },

  buildGroups: function(){
    this.mapGroup = this.snapSVG.g()
    this.referenceBodiesGroup = this.snapSVG.g()
    this.vesselsGroup = this.snapSVG.g()
    this.currentVesselOrbitPathsGroup = this.snapSVG.g()
    this.maneuverNodesOrbitPathsGroup = this.snapSVG.g()
    this.targetVesselOrbitPathsGroup = this.snapSVG.g()

    //Add all the other groups to the mapGroup
    this.mapGroup.add(
      this.referenceBodiesGroup,
      this.vesselsGroup,
      this.currentVesselOrbitPathsGroup,
      this.maneuverNodesOrbitPathsGroup,
      this.targetVesselOrbitPathsGroup
    )
  }
})