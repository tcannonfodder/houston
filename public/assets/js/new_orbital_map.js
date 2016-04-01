var NewOrbitalMap = Class.create({
  initialize: function(positionDataFormatter, datalink, containerID){
    this.container = $(containerID)

    this.buildSceneCameraAndRenderer()

    this.distanceScaleFactor = 0.3
    this.referenceBodyScaleFactor = 0.6
    this.dashedLineLength = 100000
    this.maxLengthInThreeJS = 2000

    this.referenceBodyGeometry = {}

    this.colors = ["#b4f489", "#f48e77", "#a4d1f2", "#99ffc6", "#fcc2e7", "#99ffc6", "#9d67e5", "#f49ab2", "#ffcc99", "#b7fca4", "#ff7cd1", "#ffc9de", "#a4f9ac", "#b6ff77", "#80e6f2", "#f9bdbb", "#e79bef", "#85f7d5", "#88c4ea", "#68a9d8"]
    this.orbitPathColors = ["orange", "#b4c6f7", "#987cf9", "#6baedb", "#d0f788", "#f774dd", "#9dc3f9", "#edef70", "#f97292", "#adffb6", "#efc9ff", "#bfc0ff", "#ffe3c4", "#8eb2f9", "#83f7b7", "#8cfc8a", "#97f4b5", "#96dff7", "#ffaabe", "#eda371"]


    this.datalink = datalink
    this.positionDataFormatter = positionDataFormatter
    this.positionDataFormatter.options.onFormat = this.render.bind(this)
  },

  buildSceneCameraAndRenderer: function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true})

    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.container.appendChild( this.renderer.domElement )
  },

  buildScene: function(){
    this.scene = new THREE.Scene()
  },

  buildGeometry: function(formattedData){
    this.buildReferenceBodyGeometry(formattedData)
    this.buildVesselGeometry(formattedData)
    this.buildOrbitPathGeometry(formattedData)
    this.buildManeuverNodeGeometry(formattedData)
    // this.buildReferenceBodyOrbitPaths(formattedData)
    // this.buildDistancesFromRootReferenceBodyPaths(formattedData)
  },

  buildReferenceBodyGeometry: function(formattedData){
    this.group = new THREE.Group()
    this.scene.add(this.group)

    var i = 0
    for (var i = formattedData.referenceBodies.length - 1; i >= 0; i--) {
      var info = formattedData.referenceBodies[i]

      var color = this.colors[i]

      if(info.type == "currentPosition"){
        var material = new THREE.MeshBasicMaterial( { color: color, 'wireframe': false } )
      } else{
        if(info.linkedPatchType == "maneuverNode"){
          color = this.orbitPathColors[info.linkedPatchID]
        } else{
          color = this.orbitPathColors[info.linkedPatchID]
        }

        var material = new THREE.MeshBasicMaterial( { color: color, 'wireframe': true } )
      }

      var sphereGeometry = new THREE.SphereGeometry(info.radius * this.referenceBodyScaleFactor, 20, 20)
      var sphere = new THREE.Mesh( sphereGeometry, material )
      this.setPosition(sphere, info.truePosition)
      this.group.add(sphere)
    }
  },

  buildVesselGeometry: function(formattedData){
    var material = new THREE.MeshBasicMaterial( { color: 'white', 'wireframe': false } )

    var info = formattedData.vessels[0]

    var length = formattedData.referenceBodies[0].radius * .2

    var geometry = new THREE.BoxGeometry( length, length, length )
    var cube = new THREE.Mesh( geometry, material )

    if(info.type == "currentVessel"){
      this.currentVesselGeometry = cube
    }

    this.setPosition(cube, info.truePosition)
    this.group.add(cube)
  },

  buildOrbitPathGeometry: function(formattedData){
    for (var i = formattedData.orbitPatches.length - 1; i >= 0; i--) {
      var points = formattedData.orbitPatches[i].truePositions.map(function(x){ return this.buildVector(x) }.bind(this))

      var geometry = this.buildCurveGeometryFromPoints(points)
      var material = new THREE.LineBasicMaterial({
        color: this.orbitPathColors[i],
        linewidth: 3
      })

      var spline = new THREE.Line( geometry, material )

      this.group.add(spline)
    }
  },

  buildManeuverNodeGeometry: function(formattedData){
    for (var i = formattedData.maneuverNodes.length - 1; i >= 0; i--) {
      var maneuverNode = formattedData.maneuverNodes[i]

      for (var j = maneuverNode.orbitPatches.length - 1; j >= 0; j--) {
        var orbitPatch = maneuverNode.orbitPatches[j]
        var points = orbitPatch.truePositions.map(function(x){ return this.buildVector(x) }.bind(this))

        var geometry = this.buildCurveGeometryFromPoints(points)

        geometry.computeBoundingBox()
        var dashSize = geometry.boundingBox.size().x/Math.ceil(geometry.boundingBox.size().x/this.dashedLineLength)

        var material = new THREE.LineDashedMaterial({
          color: this.orbitPathColors[j],
          dashSize: dashSize,
          gapSize: dashSize,
          linewidth: 3
        })

        var spline = new THREE.Line( geometry, material )

        this.group.add(spline)
      }
    }
  },

  buildReferenceBodyOrbitPaths: function(formattedData){
    for (var i = formattedData.referenceBodyPaths.length - 1; i >= 0; i--) {
      var points = formattedData.referenceBodyPaths[i].truePositions.map(function(x){ return this.buildVector(x) }.bind(this))
      var material = new THREE.LineBasicMaterial( { color : 'white', linewidth: formattedData.referenceBodies[0].radius * .1 } );

      var spline = this.buildSplineWithMaterial(points, material)

      this.group.add(spline)
    }
  },

  buildDistancesFromRootReferenceBodyPaths: function(formattedData){
    var colors = ['teal', 'magenta','purple', 'green', 'blue', 'red']

    for (var i = formattedData.distancesFromRootReferenceBody.length - 1; i >= 0; i--) {
      var points = formattedData.distancesFromRootReferenceBody[i].truePositions.map(function(x){ return this.buildVector(x) }.bind(this))
      var material = new THREE.LineBasicMaterial( { color : colors[i], linewidth: formattedData.referenceBodies[0].radius * .1 } );

      var spline = this.buildSplineWithMaterial(points, material)

      this.group.add(spline)
    }
  },

  positionCamera: function(){
    var boundingBox = new THREE.Box3().setFromObject(this.group)
    var scaleFactor = Math.max(
      (this.maxLengthInThreeJS/boundingBox.max.x),
      (this.maxLengthInThreeJS/boundingBox.max.y),
      (this.maxLengthInThreeJS/boundingBox.max.z)
    )

    this.group.scale.set(scaleFactor, scaleFactor, scaleFactor)
    var boundingBox = new THREE.Box3().setFromObject(this.group)

    var hex  = 0xff0000;
    var bbox = new THREE.BoundingBoxHelper( this.group, hex );
    bbox.update();
    this.scene.add( bbox );

    if(!this.camera){
      var cameraX = this.getMiddle(boundingBox.min.x, boundingBox.max.x)
      var cameraZ = this.getMiddle(boundingBox.min.z, boundingBox.max.z)

      var y1 = this.getMiddle(boundingBox.min.z, boundingBox.max.z) * Math.tan(0.785)
      var cameraY = boundingBox.max.y + y1

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, Number.MAX_SAFE_INTEGER)// 700000 * 2 )

      this.camera.position.set(cameraX, cameraY, cameraZ)

      this.camera.lookAt(this.currentVesselGeometry.position)

      this.camera.rotation.z = Math.PI /2


      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement);
      this.controls.addEventListener( 'change', function(){this.renderer.render(this.scene, this.camera)}.bind(this) ); // add this only if there is no animation loop (requestAnimationFrame)
      this.controls.target = this.currentVesselGeometry.position.scale(scaleFactor, scaleFactor, scaleFactor)
      // this.controls.enableDamping = true;
      // this.controls.dampingFactor = 0.25;
    }
  },

  getMiddle: function(min, max){
    // debugger
    return min + ((Math.abs(min) + Math.abs(max))/2.0)
  },

  setPosition: function(mesh, vector){
    var vector = this.buildVector(vector)
    mesh.position.x = vector.x
    mesh.position.y = vector.y
    mesh.position.z = vector.z
  },

  buildVector: function(vector){
    return new THREE.Vector3( vector[0] * this.distanceScaleFactor, vector[2] * this.distanceScaleFactor, vector[1] * this.distanceScaleFactor );
  },

  buildCurveGeometryFromPoints: function(points){
    var curve = new THREE.CatmullRomCurve3(points);
    var geometry = new THREE.Geometry()
    geometry.vertices = curve.getPoints( 360 );
    geometry.computeLineDistances()
    return geometry
  },

  render: function (formattedData) {
    requestAnimationFrame( function(){
      this.buildScene()
      this.buildGeometry(formattedData)
      this.positionCamera()
      this.renderer.render(this.scene, this.camera)
    }.bind(this))
  }
})