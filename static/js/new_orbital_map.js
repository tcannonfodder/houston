var NewOrbitalMap = Class.create({
  initialize: function(positionDataFormatter, datalink, containerID){
    this.container = $(containerID)

    this.buildSceneCameraAndRenderer()
    // this.buildGeometry()

    this.distanceScaleFactor = 0.3
    this.referenceBodyScaleFactor = 0.6

    this.referenceBodyGeometry = {}

    this.colors = ["#b4f489", "#f48e77", "#a4d1f2", "#99ffc6", "#fcc2e7", "#99ffc6", "#9d67e5", "#f49ab2", "#ffcc99", "#b7fca4", "#ff7cd1", "#ffc9de", "#a4f9ac", "#b6ff77", "#80e6f2", "#f9bdbb", "#e79bef", "#85f7d5", "#88c4ea", "#68a9d8"]

    this.datalink = datalink
    this.positionDataFormatter = positionDataFormatter
    this.positionDataFormatter.options.onFormat = this.render.bind(this)
  },

  buildSceneCameraAndRenderer: function(){
    this.renderer = new THREE.WebGLRenderer()

    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.container.appendChild( this.renderer.domElement )
  },

  buildScene: function(){
    this.scene = new THREE.Scene()
  },

  buildGeometry: function(formattedData){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshBasicMaterial( { color: '#C5DCAB', 'wireframe': false } )

    // this.cube = new THREE.Mesh( geometry, material )
    // this.scene.add( this.cube )

    // var sphereGeometry = new THREE.SphereGeometry(50, 20, 20)
    // this.sphere = new THREE.Mesh( sphereGeometry, material )
    // this.scene.add( this.sphere )

    // this.camera.position.z = 100

    this.buildReferenceBodyGeometry(formattedData)
    this.buildVesselGeometry(formattedData)
    this.buildOrbitPathGeometry(formattedData)
  },

  buildReferenceBodyGeometry: function(formattedData){
    // debugger
    this.group = new THREE.Group()
    this.scene.add(this.group)

    var i = 0
    for (var i = formattedData.referenceBodies.length - 1; i >= 0; i--) {
      var info = formattedData.referenceBodies[i]

      var material = new THREE.MeshBasicMaterial( { color: this.colors[i], 'wireframe': true } )
      console.log(info.radius)
      var sphereGeometry = new THREE.SphereGeometry(info.radius * this.referenceBodyScaleFactor, 20, 20)
      var sphere = new THREE.Mesh( sphereGeometry, material )
      this.setPosition(sphere, info.truePosition)
      // debugger
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
    // debugger
    this.group.add(cube)
  },

  buildOrbitPathGeometry: function(formattedData){
    //Create a closed bent a sine-like wave
    var points = formattedData.orbitPaths[0].truePositions.map(function(x){ return this.buildVector(x) }.bind(this))
    var curve = new THREE.SplineCurve3(points);

    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints( 120 );

    var material = new THREE.LineBasicMaterial( { color : 'orange', linewidth: formattedData.referenceBodies[0].radius * .1 } );

    //Create the final Object3d to add to the scene
    var splineObject = new THREE.Line( geometry, material );

    this.group.add(splineObject)
  },

  positionCamera: function(){
      var boundingBox = new THREE.Box3().setFromObject(this.group)
      // debugger
      console.log(boundingBox)

      var hex  = 0xff0000;
      var bbox = new THREE.BoundingBoxHelper( this.group, hex );
      bbox.update();
      this.scene.add( bbox );

      // debugger

    if(!this.camera){
      var cameraX = this.getMiddle(boundingBox.min.x, boundingBox.max.x) - 100000 //boundingBox.max.x - Math.abs(boundingBox.min.x)
      // debugger
      var cameraZ = this.getMiddle(boundingBox.min.z, boundingBox.max.z) //boundingBox.max.z * 1.05

      var y1 = this.getMiddle(boundingBox.min.z, boundingBox.max.z) * Math.tan(0.785)
      var cameraY = boundingBox.max.y + y1

      //this.getMiddle(boundingBox.min.y, boundingBox.max.y) // boundingBox.max.y - Math.abs(boundingBox.min.y)

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, Number.MAX_SAFE_INTEGER)// 700000 * 2 )
      // this.camera = new THREE.OrthographicCamera(
      //   boundingBox.min.x,
      //   boundingBox.max.x,
      //   boundingBox.max.z,
      //   boundingBox.min.x,
      //   0.1,
      //   cameraY * 2
      // )
      // debugger

      console.log(cameraX)

      // debugger

      this.camera.position.set(cameraX, cameraY, cameraZ)

      this.camera.lookAt(boundingBox.center())

      console.log(this.camera.rotation.z)
      this.camera.rotation.z = Math.PI /2


      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.addEventListener( 'change', function(){this.renderer.render(this.scene, this.camera)}.bind(this) ); // add this only if there is no animation loop (requestAnimationFrame)
      this.controls.target = this.currentVesselGeometry.position
      // this.controls.enableDamping = true;
      // this.controls.dampingFactor = 0.25;
      // this.controls.enableZoom = false;
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

  render: function (formattedData) {
    // if(this.rendered){ return }
    requestAnimationFrame( function(){
      console.log(formattedData)
      this.buildScene()
      this.buildGeometry(formattedData)
      this.positionCamera()
      // this.sphere.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)

      this.rendered = true
    }.bind(this))

    // this.sphere.rotation.x += 0.01
    // this.sphere.rotation.y += 0.001
    
  }
})