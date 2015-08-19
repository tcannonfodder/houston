/*
  The rendering logic and textures for the navball are from the KeRD project:
  https://github.com/Lokaltog/KeRD/blob/develop/app/components/modules/navigation/index.js

  Please review the licenses/ directory for more information
*/

var Navball = Class.create({
  initialize: function(datalink, containerID, headingContainerID){
    this.datalink = datalink
    this.containerID = containerID
    this.container = $(this.containerID)
    this.headingContainerID = headingContainerID
    this.headingContainer = $(this.headingContainerID)
    this.initializeDatalink()
    this.initializeNavBall()
    this.displayRadius = 50
    this.pitch = 0
    this.roll = 0
    this.heading = 0
  },

  update: function(data){
    //rotation tweening
    var navballTweenProperties = {
      pitch: this.pitch,
      roll: this.roll,
      heading: this.heading
    }

    var navballTween = new TWEEN.Tween(navballTweenProperties).to({
      // add normalized delta values to current values
      pitch: this.pitch + this.wrapDegDelta(data['n.pitch'] - this.pitch),
      roll: this.roll + this.wrapDegDelta(data['n.roll'] - this.roll),
      heading: this.heading + this.wrapDegDelta(data['n.heading'] - this.heading)
    }, this.datalink.rate)

    this.pitch = data['n.pitch']
    this.roll = data['n.roll']
    this.heading = data['n.heading']

    navballTween.onUpdate(function(){
      this.navballMesh.rotation.order = "ZXY"
      this.navballMesh.rotation.z = Math.toRadians(-navballTweenProperties.roll)
      this.navballMesh.rotation.x = Math.toRadians(navballTweenProperties.pitch)
      this.navballMesh.rotation.y = Math.toRadians(270 - navballTweenProperties.heading)
    }.bind(this))

    this.headingContainer.update(this.heading.toFixed(1) + "&deg;")

    navballTween.start()
  },

  wrapDegDelta: function(delta) {
    // Applying this function to a sphere rotation delta ensures that the
    // rotation of a sphere rotates the shortest distance possible (i.e. when
    // wrapping from 359->0deg it will return a delta of +1 instead of -359)
    if (delta > 180) {
      delta = delta - 360
    }
    else if (delta < -180) {
      delta = 360 + delta
    }
    return delta
  },

  initializeNavBall: function(){
    //initialize the three.js renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })

    this.renderer.setSize(1,1)
    this.container.update(this.renderer.domElement)

    this.resize()
    Event.observe(window, "resize", this.resize.bind(this))

    //scene, camera, lights!
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(32, 1, 0.01, 1000)
    camera.position.z = 190

    scene.add(new THREE.AmbientLight(0xaaaaaa))

    var light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(1500, 1500, 500)

    var light2 = new THREE.DirectionalLight(0xffffff, 0.5)
    light2.position.set(-1500, -1500, 500)

    scene.add(light1)
    scene.add(light2)

    //initialize the body geometry and materials
    var navballGeometry = new THREE.SphereGeometry(this.displayRadius, 48, 48)
    var navballTexture = THREE.ImageUtils.loadTexture('../assets/images/navball.png')
    navballTexture.anisotropy = this.renderer.getMaxAnisotropy()

    var navballMaterial = new THREE.MeshPhongMaterial({
      map: navballTexture,
      bumpMap: THREE.ImageUtils.loadTexture('../assets/images/navball-normal.png'),
      bumpScale: 0.25,
      shininess: 80,
    })

    this.navballMesh = new THREE.Mesh(navballGeometry, navballMaterial)

    scene.add(this.navballMesh)

    var animate = function(){
      window.setTimeout(function(){
        requestAnimationFrame(animate)
      }, this.datalink.rate/60 ) //60 fps

      TWEEN.update()

      this.renderer.render(scene, camera)
    }.bind(this)

    requestAnimationFrame(animate)
  },

  resize: function(){
    var width = this.container.getWidth()
    var height = this.container.getHeight()
    this.renderer.setSize(width, height)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['n.pitch', 'n.roll', 'n.heading'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})