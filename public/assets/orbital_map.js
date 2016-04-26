var OrbitalMap = Class.create({
  initialize: function(positionDataFormatter, datalink, containerID){
    this.container = $(containerID)

    this.GUIParameters = {
      "reset": this.resetPosition.bind(this),
      "fullscreen": this.toggleFullscreen.bind(this),
      "lastUpdate": '00:00:00'
    }

    this.buildSceneCameraAndRenderer()
    this.buildGUI()

    this.distanceScaleFactor = 1
    this.referenceBodyScaleFactor = 1
    this.sunBodyScaleFactor = 1
    this.dashedLineLength = 100000
    this.maxLengthInThreeJS = 2000
    this.vehicleLength = 25000
    this.defaultZoomFactor = 40

    this.referenceBodyGeometry = {}

    this.colors = ["#b4f489", "#f48e77", "#a4d1f2", "#99ffc6", "#fcc2e7", "#99ffc6", "#9d67e5", "#f49ab2", "#ffcc99", "#b7fca4", "#ff7cd1", "#ffc9de", "#a4f9ac", "#b6ff77", "#80e6f2", "#f9bdbb", "#e79bef", "#85f7d5", "#88c4ea", "#68a9d8"]
    this.orbitPathColors = ["orange", "#b4c6f7", "#987cf9", "#6baedb", "#d0f788", "#f774dd", "#9dc3f9", "#edef70", "#f97292", "#adffb6", "#efc9ff", "#bfc0ff", "#ffe3c4", "#8eb2f9", "#83f7b7", "#8cfc8a", "#97f4b5", "#96dff7", "#ffaabe", "#eda371"]
    this.targetColor = '#51ff07'

    this.datalink = datalink
    this.positionDataFormatter = positionDataFormatter
    this.positionDataFormatter.options.onFormat = this.render.bind(this)
  },

  buildGUI: function(){
    var gui = new dat.GUI({ autoPlace: false });
    gui.add( this.GUIParameters, 'reset' ).name('Reset');
    gui.add( this.GUIParameters, 'fullscreen' ).name('ToggleFullscreen');
    gui.add( this.GUIParameters, 'lastUpdate' ).name('Updated').listen();

    this.container.appendChild(gui.domElement);
  },

  toggleFullscreen: function(){
    if(!THREEx.FullScreen.available()){return}

    if(THREEx.FullScreen.activated()){
      THREEx.FullScreen.cancel()
    } else{
      THREEx.FullScreen.request(this.container)
      this.renderer.domElement.focus()
    }
  },

  buildSceneCameraAndRenderer: function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true})

    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight )
    this.renderer.setClearColor('#3A1604')
    this.container.appendChild( this.renderer.domElement )

    window.addEventListener('resize', function(){
      this.camera.aspect = this.container.clientWidth/this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    }.bind(this), false );
  },

  buildScene: function(){
    this.scene = new THREE.Scene()
  },

  buildGeometry: function(formattedData){
    this.group = new THREE.Group()
    this.scene.add(this.group)

    this.buildReferenceBodyGeometry(formattedData)
    this.buildVesselGeometry(formattedData)
    this.buildOrbitPathGeometry(formattedData)
    this.buildManeuverNodeGeometry(formattedData)
    // this.buildReferenceBodyOrbitPaths(formattedData)
    // this.buildDistancesFromRootReferenceBodyPaths(formattedData)
  },

  buildReferenceBodyGeometry: function(formattedData){
    var i = 0
    for (var i = formattedData.referenceBodies.length - 1; i >= 0; i--) {
      var info = formattedData.referenceBodies[i]

      //render the sun last, and separately
      // if(info.name == "Sun"){ continue; }

      if(info.color){
        var color = info.color
      } else {
        var color = this.colors[i]
      }
      var radius = info.radius * this.referenceBodyScaleFactor

      if(info.name == "Sun"){ color = 'yellow' }

      if(info.type == "currentPosition"){
        var material = new THREE.MeshBasicMaterial( { color: color, 'wireframe': false } )
      } else if(info.type == "targetBodyCurrentPosition"){
        var material = new THREE.MeshBasicMaterial( { color: this.targetColor, 'wireframe': false } )
        radius = radius * 1.2
      } else{
        if(info.name != "Sun"){
          if(info.linkedPatchType == "maneuverNode"){
            color = this.orbitPathColors[info.linkedPatchID]
          } else{
            color = this.orbitPathColors[info.linkedPatchID]
          }
        }

        var material = new THREE.MeshBasicMaterial( { color: color, 'wireframe': true } )
      }

      var sphereGeometry = new THREE.SphereGeometry(radius, 20, 20)
      var sphere = new THREE.Mesh( sphereGeometry, material )
      this.setPosition(sphere, info.truePosition)
      this.group.add(sphere)

      if(info.atmosphericRadius > 0){
        // Now to add the atmospheric glow
        var customMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 
          { 
            "c":   { type: "f", value: 1 },
            "p":   { type: "f", value: 1.5 },
            glowColor: { type: "c", value: new THREE.Color('white') },
            viewVector: { type: "v3", value: (this.camera && this.camera.position) || sphere.position }
          },
          vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
          fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
          side: THREE.FrontSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        }   );

        var atmoGeometry = new THREE.SphereGeometry((info.radius + info.atmosphericRadius) * this.referenceBodyScaleFactor, 20, 20)
        atmo = new THREE.Mesh( atmoGeometry, customMaterial );
        this.setPosition(atmo, info.truePosition)
        this.group.add( atmo );
      }
    }
  },

  buildVesselGeometry: function(formattedData){
    for (var i = formattedData.vessels.length - 1; i >= 0; i--) {
      var info = formattedData.vessels[i]

      if(info.type == "currentVessel"){
        var materials = [
          new THREE.MeshBasicMaterial( { color: 'white', 'wireframe': false } ),
          new THREE.MeshBasicMaterial( { color: 'grey', 'wireframe': true } )
        ];
      } else{
        var materials = [
          new THREE.MeshBasicMaterial( { color: this.targetColor, 'wireframe': false } ),
          new THREE.MeshBasicMaterial( { color: 'grey', 'wireframe': true } )
        ];
      }

      var length = this.vehicleLength

      var geometry = new THREE.BoxGeometry( length, length, length)
      var cube = THREE.SceneUtils.createMultiMaterialObject( geometry, materials );

      if(info.type == "currentVessel"){
        this.currentVesselGeometry = cube
      }

      this.setPosition(cube, info.truePosition)
      this.group.add(cube)
    }
  },

  buildOrbitPathGeometry: function(formattedData){
    for (var i = formattedData.orbitPatches.length - 1; i >= 0; i--) {
      var points = formattedData.orbitPatches[i].truePositions.map(function(x){ return this.buildVector(x) }.bind(this))

      if(formattedData.orbitPatches[i].parentType == "targetVessel"){
        var color = this.targetColor
      } else{
        var color = this.orbitPathColors[i]
      }

      var geometry = this.buildCurveGeometryFromPoints(points)
      var material = new THREE.LineBasicMaterial({
        color: color,
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

      var geometry = this.buildCurveGeometryFromPoints(points)

      var spline = new THREE.Line( geometry, material )

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

    // var hex  = 0xff0000;
    // var bbox = new THREE.BoundingBoxHelper( this.group, hex );
    // bbox.update();
    // this.scene.add( bbox );

    var vector = this.currentVesselGeometry.position.clone()
    vector.multiplyScalar(scaleFactor)
    var axisHelper = new THREE.AxisHelper(this.vehicleLength * 3 * scaleFactor);
    axisHelper.position.set(vector.x, vector.y, vector.z)
    axisHelper.rotation = this.currentVesselGeometry.rotation

    this.scene.add( axisHelper );

    var cameraX = vector.x + ((this.vehicleLength * this.defaultZoomFactor) * scaleFactor)
    var cameraY = vector.y + ((this.vehicleLength * this.defaultZoomFactor) * scaleFactor)
    var cameraZ = vector.z + ((this.vehicleLength * this.defaultZoomFactor) * scaleFactor)

    if(!this.camera){
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, Number.MAX_SAFE_INTEGER)
    }

    if(!this.controls){
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement);
      this.controls.addEventListener( 'change', function(){this.renderer.render(this.scene, this.camera)}.bind(this) ); // add this only if there is no animation loop (requestAnimationFrame)
    }

    if(!this.cameraSet){
      this.controls.target = vector
      this.camera.position.set(cameraX, cameraY, cameraZ)
      this.camera.lookAt(vector)
      // this.controls.rotate.x = -Math.PI/2
      this.cameraSet = true
    } else{
      this.controls.target0 = vector.clone()
      this.controls.position0 = new THREE.Vector3(cameraX, cameraY, cameraZ)
    }

    this.controls.maxDistance = Math.max(
      (Math.abs(boundingBox.min.x) + Math.abs(boundingBox.max.x)),
      (Math.abs(boundingBox.min.y) + Math.abs(boundingBox.max.y)),
      (Math.abs(boundingBox.min.z) + Math.abs(boundingBox.max.z))
    ) * 2
    this.controls.minDistance = this.vehicleLength * scaleFactor
  },

  resetPosition: function(){
    this.controls.reset()
  },

  getMiddle: function(min, max){
    return min + ((Math.abs(min) + Math.abs(max))/2.0)
  },

  setPosition: function(mesh, vector){
    var vector = this.buildVector(vector)
    mesh.position.x = vector.x
    mesh.position.y = vector.y
    mesh.position.z = vector.z
  },

  buildVector: function(vector){
    return new THREE.Vector3( vector[0] * this.distanceScaleFactor, vector[1] * this.distanceScaleFactor, vector[2] * this.distanceScaleFactor );
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
      this.GUIParameters.lastUpdate = TimeFormatters.formatUT(formattedData.currentUniversalTime)
    }.bind(this))
  }
})