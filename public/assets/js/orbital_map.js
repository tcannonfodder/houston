var OrbitalMap = Class.create({
  initialize: function(orbitalPositionData, datalink, svgCanvasID){
    this.svgCanvasID = svgCanvasID
    this.svgCanvas = $(svgCanvasID)
    this.initializeSVGCanvas()
    this.scale = 5000

    this.now = null
    this.currentVessel = null
    this.rootReferenceBody = {"radius": null, "currentTruePosition": null}

    this.KSPCoordinateCenter = null

    this.currentVesselSVG = null
    this.currentVesselOrbitSVGs = []
    this.currentVesselManeuverNodeSVGs = []

    this.targetVesselSVG = null
    this.targetVesselOrbitSVGs = []

    this.rootReferenceBodySVG = null

    this.datalink = datalink
    this.orbitalPositionData = orbitalPositionData;
    this.orbitalPositionData.options.onRecalculate = this.render.bind(this)
  },

  render: function(positionData){
    this.currentVessel = positionData["vesselCurrentPosition"]
    this.targetVessel = positionData["targetCurrentPosition"]
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

    console.log(this.currentVessel["relativePosition"])

    var currentVesselPosition = this.positionOnCanvasForRelativePosition(
      this.currentVessel["relativePosition"],
      this.rootReferenceBody["currentTruePosition"]
    )

    console.log(currentVesselPosition)

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

    for (var i = 0; i < positionData["o.orbitPatches"].length; i++) {
      var orbitPatch = positionData["o.orbitPatches"][i]
      var orbitPatchPoints = []
      var orbitPatchPositionData = orbitPatch["positionData"]
      var referenceBody = orbitPatch["referenceBody"]
      var universalTimes = Object.keys(orbitPatchPositionData)

      for (var j = 0; j < universalTimes.length; j++) {
        var universalTime = universalTimes[j]
        var relativePosition = orbitPatchPositionData[universalTime]["relativePosition"]
        var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["positionData"][universalTime]["truePosition"]

        // debugger
        var point = this.positionOnCanvasForRelativePosition(
          relativePosition,
          this.rootReferenceBody["currentTruePosition"] //truePositionOfReferenceBody
        )

        orbitPatchPoints.push(point)
      };

      this.currentVesselOrbitSVGs[i] = this.currentVesselOrbitSVGs[i] || this.snapSVG.polyline(orbitPatchPoints)
      this.currentVesselOrbitSVGs[i].attr({
        points: orbitPatchPoints,
        fill: 'none',
        stroke: 'teal',
        strokeWidth: 5
      })
    };


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

        for (var k = 0; k < universalTimes.length; k++) {
          var universalTime = universalTimes[k]
          var universalTimeFloat = parseFloat(universalTime)
          var relativePosition = orbitPatchPositionData[universalTime]["relativePosition"]
          var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["positionData"][universalTime]["truePosition"]

          if(firstUniversalTimeOfLastOrbitPatch && universalTimeFloat < firstUniversalTimeOfLastOrbitPatch){
            continue
          }

          var point = this.positionOnCanvasForRelativePosition(
            relativePosition,
            this.rootReferenceBody["currentTruePosition"] //truePositionOfReferenceBody
          )

          orbitPatchPoints.push(point)
        };

        //Now that all the universal times for this orbit patch have been set to plot, we can tell the next orbit patch to not render
        //anything before this patch (creating a continuous line in the orbital map)
        firstUniversalTimeOfLastOrbitPatch = sortedUniversalTimes[0]

        var svgIndex = this.currentVesselManeuverNodeSVGs.length

        this.currentVesselManeuverNodeSVGs[svgIndex] = this.currentVesselManeuverNodeSVGs[svgIndex] || this.snapSVG.polyline(orbitPatchPoints)
        this.currentVesselManeuverNodeSVGs[svgIndex].attr({
          points: orbitPatchPoints,
          fill: 'none',
          stroke: 'green',
          strokeWidth: 5
        })
      };
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
          var truePositionOfReferenceBody = positionData["referenceBodies"][referenceBody]["positionData"][universalTime]["truePosition"]

          var point = this.positionOnCanvasForRelativePosition(
            relativePosition,
            this.rootReferenceBody["currentTruePosition"] //truePositionOfReferenceBody
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
  }
})