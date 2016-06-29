var DockingMap = Class.create({
  initialize: function(dockingPositionData, datalink, containerID){
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
    this.maxLengthInThreeJS = 2000
    this.vehicleLength = 1
    this.defaultZoomFactor = 10

    this.referenceBodyGeometry = {}

    this.targetColor = '#51ff07'

    this.datalink = datalink
    this.dockingPositionData = dockingPositionData
    this.dockingPositionData.options.onRecalculate = this.render.bind(this)
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

  resizeRenderer: function(){
    this.renderer.setSize(1, 1)
    this.camera.aspect = this.container.clientWidth/this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  },

  buildSceneCameraAndRenderer: function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true})

    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight )
    this.renderer.setClearColor('#3A1604')
    this.container.appendChild( this.renderer.domElement )

    new ResizeSensor(this.container, function() {
      if(this.camera){
        this.resizeRenderer()
      }
    }.bind(this));
  },

  buildScene: function(){
    this.scene = new THREE.Scene()
  },

  buildGeometry: function(positionData){
    this.group = new THREE.Group()
    this.scene.add(this.group)

    this.buildVesselGeometry(positionData)
    this.buildTargetGeometry(positionData)
  },

  buildVesselGeometry: function(positionData){
    var materials = [
      new THREE.MeshBasicMaterial( { color: 'white', 'wireframe': false } ),
      new THREE.MeshBasicMaterial( { color: 'grey', 'wireframe': true } )
    ];

    var length = this.vehicleLength

    var geometry = new THREE.BoxGeometry( length, length, length)
    var cube = THREE.SceneUtils.createMultiMaterialObject( geometry, materials );

    this.currentVesselGeometry = cube

    // Use the vessel as the zero point in the map
    this.setPosition(cube, [0,0,0])
    this.group.add(cube)
  },

  buildTargetGeometry: function(positionData){
    if(!positionData.targetCurrentPosition || !positionData.targetCurrentPosition.truePosition){
      return
    }

    var materials = [
      new THREE.MeshBasicMaterial( { color: this.targetColor, 'wireframe': false } ),
      new THREE.MeshBasicMaterial( { color: 'grey', 'wireframe': true } )
    ];

    var length = this.vehicleLength

    var geometry = new THREE.BoxGeometry( length, length, length)
    var cube = THREE.SceneUtils.createMultiMaterialObject( geometry, materials );

    this.targetGeometry = cube

    var position = [
      positionData.targetCurrentPosition.truePosition[0] - positionData.vesselCurrentPosition.truePosition[0],
      positionData.targetCurrentPosition.truePosition[2] - positionData.vesselCurrentPosition.truePosition[2],
      positionData.targetCurrentPosition.truePosition[1] - positionData.vesselCurrentPosition.truePosition[1]
    ]

    this.setPosition(cube, position)
    this.group.add(cube)
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

    var targetVector = vector;
    // targetVector.multiplyScalar(scaleFactor)

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