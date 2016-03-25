var NewOrbitalMap = Class.create({
  initialize: function(orbitalPositionData, datalink, containerID){
    this.container = $(containerID)
    this.buildSceneCameraAndRenderer()
    this.buildGeometry()

    this.render();
  },

  buildSceneCameraAndRenderer: function(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    this.renderer = new THREE.WebGLRenderer()

    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.container.appendChild( this.renderer.domElement )
  },

  buildGeometry: function(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshBasicMaterial( { color: '#C5DCAB', 'wireframe': true } )

    // this.cube = new THREE.Mesh( geometry, material )
    // this.scene.add( this.cube )

    var sphereGeometry = new THREE.SphereGeometry(50, 20, 20)
    this.sphere = new THREE.Mesh( sphereGeometry, material )
    this.scene.add( this.sphere )

    this.camera.position.z = 100
  },

  render: function () {
    requestAnimationFrame( this.render.bind(this) )

    // this.sphere.rotation.x += 0.01
    // this.sphere.rotation.y += 0.001
    // this.sphere.rotation.z += 0.01

    this.renderer.render(this.scene, this.camera)
  }
})