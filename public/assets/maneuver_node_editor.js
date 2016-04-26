var ManeuverNodeEditor = Class.create({
  initialize: function(datalink, options){
    this.datalink = datalink

    /* the options
      control elements:
      - maneuverNode
      - quickIncrement
      - ut
      - utPlus
      - utMinus
      - utAp
      - utPe
      - ut1KPlus
      - ut1KMinus
      - prograde
      - progradePlus
      - progradeMinus
      - normal
      - normalPlus
      - normalMinus
      - radial
      - radialPlus
      - radialMinus

      display elements:
      - deltaV
      - orbitInfoTable
      - noManeuverNodesMessage

    */
    this.options = options || {}
    this.maneuverNodes = []
    this.currentUniversalTime = 0
    this.apoapsisTime = 0
    this.periapsisTime = 0

    this.orbitInfoTable = new DataTable(this.options.orbitInfoTable, [])

    this.initializeUI()
    this.initializeDatalink()
  },

  update: function(data){
    this.currentUniversalTime = data['t.universalTime']
    this.apoapsisTime = this.currentUniversalTime + data['o.timeToAp']
    this.periapsisTime = this.currentUniversalTime + data['o.timeToPe']
    var nodes = data['o.maneuverNodes']

    var currentlySelectedNodeIndex = this.indexOfEditingManeuverNode()

    // Update the data structure for each node that isn't currently being edited
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]

      //don't automatically update the selected node
      //that is done when the user changes values or
      //manually refreshes
      if(currentlySelectedNodeIndex == i){ continue }

      // replace the node's data
      this.maneuverNodes[i] = node
    }

    //add a select option for each new node that doesn't exist
    while(this.options.maneuverNode.options.length < nodes.length){
      this.addManeuverNodeOption(this.options.maneuverNode.options.length)
    }

    //remove any select options for nodes that don't exist in the data structure yet
    for (var j = this.options.maneuverNode.options.length - 1; j >= nodes.length; j--) {
      this.options.maneuverNode.remove(j)
    };

    //if the current node being edited is not within the bounds, pick the first
    //node as the one being edited
    if(nodes.length > 0 && (currentlySelectedNodeIndex < 0 ||
      currentlySelectedNodeIndex > nodes.length
    )){
      this.selectNodeToEdit(0)
      this.updateUI()
    }

    window.requestAnimationFrame(function(){
      if(nodes.length <= 0){
        this.options.noManeuverNodesMessage.show()
      } else{
        this.options.noManeuverNodesMessage.hide()
      }
      this.updateManeuverNodeSelectorUI()
    }.bind(this))
  },

  updateNodeEditorUI: function(){
    var node = this.nodeCurrentlyEditing()
    if(node){
      this.options.ut.value = node["UT"]
      this.options.prograde.value = node["deltaV"][2]
      this.options.normal.value = node["deltaV"][1]
      this.options.radial.value = node["deltaV"][0]
    } else{
      // Zero out the UI if the node doesn't exist
      this.options.ut.value = ""
      this.options.prograde.value = ""
      this.options.normal.value = ""
      this.options.radial.value = ""
    }
  },

  calculateDeltaV: function(deltaV){
    return Math.sqrt(Math.pow(deltaV[0],2) +
      Math.pow(deltaV[1],2) + Math.pow(deltaV[2],2)
    )
  },

  updateNodeOrbitInfo: function(){
    var node = this.nodeCurrentlyEditing()

    if(node){
      var deltaVResult = this.calculateDeltaV(node["deltaV"])
    } else{
      var deltaVResult = ""
    }
    this.options.deltaV.update(DataFormatters.velocityString(deltaVResult))

    this.orbitInfoTable.dataRows = this.dataRowsForOrbitInfo(node)
    if(this.orbitInfoTable.dataRows.length == 0){
      this.orbitInfoTable.clear()
     }else{
      this.orbitInfoTable.update()
    }
  },

  dataRowsForOrbitInfo: function(node){
    if(!node){ return [] }
    return [
      {
        label: "Apoapsis",
        value: DataFormatters.distanceString(node["ApA"])
      },
      {
        label: "Periapsis",
        value: DataFormatters.distanceString(node["PeA"])
      },
      {
        label: "Inclination",
        value: DataFormatters.degreeString(node["inclination"])
      },
      {
        label: "Eccentricity",
        value: DataFormatters.plainNumberString(node["eccentricity"])
      },
      {
        label: "Reference Body",
        value: node["referenceBody"]
      },
      {
        label: "Epoch",
        value: DataFormatters.plainNumberString(node["epoch"])
      },
      {
        label: "Argument of Periapsis",
        value: DataFormatters.degreeString(node["argumentOfPeriapsis"])
      },
      {
        label: "Semimajor Axis",
        value: DataFormatters.degreeString(node["sma"])
      },
      {
        label: "Longitude of Ascending Node",
        value: DataFormatters.degreeString(node["lan"])
      },
      {
        label: "Mean Anomaly at Epoch",
        value: DataFormatters.degreeString(node["maae"])
      },
      {
        label: "Reference Body",
        value: node["referenceBody"] || "NA"
      }
    ]
  },

  mergeCurrentlyEditingManeuverNode: function(newNode, index){
    var currentNode = this.maneuverNodes[index]
    var ut = parseFloat(this.options.ut.value)
    var deltaV = [
      parseFloat(this.options.radial.value) || 0,
      parseFloat(this.options.normal.value) || 0,
      parseFloat(this.options.prograde.value) || 0,
    ]

    this.maneuverNodes[index] = Object.extend(newNode, {"ut": ut, "deltaV": deltaV})
    return this.maneuverNodes[index]
  },

  indexOfEditingManeuverNode: function(){
    return this.options.maneuverNode.selectedIndex
  },

  nodeCurrentlyEditing: function(){
    return this.maneuverNodes[this.indexOfEditingManeuverNode()]
  },

  selectNodeToEdit: function(index){
    this.options.maneuverNode.selectedIndex = index
  },

  updateUI: function(){
    window.requestAnimationFrame(function(){
      this.updateNodeEditorUI()
      this.updateNodeOrbitInfo()
      this.updateManeuverNodeSelectorUI()
    }.bind(this))
  },

  updateManeuverNodeSelectorUI: function(){
    //add a new node selector for each new node that doesn't exist
    var maneuverNodesCount = this.options.maneuverNode.options.length
    for(var i = 0; i < maneuverNodesCount; i++){
      this.addOrUpdateManeuverNodeSelector(i)
    }

    //remove any select options for nodes that don't exist in the data structure yet
    for (var j = this.options.nodeSelector.children.length - 1; j >= maneuverNodesCount; j--) {
      var child = this.options.nodeSelector.children[j]
      this.options.nodeSelector.removeChild(child)
    };
  },

  addOrUpdateManeuverNodeSelector: function(index){
    var node = this.maneuverNodes[index]
    var selector = this.options.nodeSelector.children[index]

    //remove the selector if a matching node doesn't exist
    if(!node){
      if(selector){ this.options.nodeSelector.removeChild(selector) }
      return
    }

    if(!selector){
      var docFragment = document.createDocumentFragment();
      var selector = document.createElement('li')
      var title = document.createElement("span")
      var deltaV = document.createElement("span")
      var arrival = document.createElement("span")
      var remove = document.createElement("button")
      title.addClassName("title")
      deltaV.addClassName('deltav')
      arrival.addClassName("arrival")
      remove.addClassName("remove")
      remove.update("remove")
      selector.appendChild(title)
      selector.appendChild(deltaV)
      selector.appendChild(arrival)
      selector.appendChild(remove)
      docFragment.appendChild(selector)

      selector.observe('click', function(){
        this.selectNodeToEdit(index)
        this.updateNodeEditorUI()
        this.updateNodeOrbitInfo()
      }.bind(this))

      remove.observe("click", function(){
        this.removeManeuverNode(index)
      }.bind(this))

      this.options.nodeSelector.appendChild(docFragment)
    } else{
      var title = selector.down('.title')
      var deltaV = selector.down('.deltav')
      var arrival = selector.down('.arrival')
    }

    if(index == this.indexOfEditingManeuverNode()){
      selector.addClassName("selected")
    } else{
      selector.removeClassName("selected")
    }

    title.update("Node " + index)
    deltaV.update("&Delta;v: " + DataFormatters.velocityString(this.calculateDeltaV(node["deltaV"])))
    var timeToArrival = node["UT"] - this.currentUniversalTime
    arrival.update((timeToArrival > 0 ? "-" : "+") + DataFormatters.timeString(Math.abs(timeToArrival)))
  },

  addManeuverNodeOption: function(index){
    var option = document.createElement("option")
    option.value = index
    option.text = index
    this.options.maneuverNode.add(option)
  },

  addManeuverNode: function(){
    if(this.maneuverNodes.length > 0){
      var universalTime = this.maneuverNodes.last()["UT"] + 1000
    } else{
      var universalTime = this.currentUniversalTime + 1000
    }

    var nodeName = "o.addManeuverNode[" + universalTime + ",0,0,0]"
    params = {}
    params[nodeName] = nodeName
    newIndex = this.options.maneuverNode.options.length
    this.datalink.sendMessage(params, function(data){
      this.maneuverNodes[newIndex] = data[nodeName]
      this.addManeuverNodeOption(newIndex)
      this.selectNodeToEdit(newIndex)
      this.updateUI()
    }.bind(this))
  },

  updateCurrentNode: function(){
    var index = this.indexOfEditingManeuverNode()
    var ut = parseFloat(this.options.ut.value) || this.currentUniversalTime

    var prograde = parseFloat(this.options.prograde.value) || 0.00
    var normal = parseFloat(this.options.normal.value) || 0.00
    var radial = parseFloat(this.options.radial.value) || 0.00
    this.updateManeuverNode(index, ut, radial, normal, prograde)
  },

  updateManeuverNode: function(index, ut, prograde, normal, radial){
    var options = [index, ut, prograde, normal, radial]
    var nodeName = "o.updateManeuverNode[" + options.join(',') + "]"
    params = {}
    params[nodeName] = nodeName

    this.datalink.sendMessage(params, function(data){
      this.maneuverNodes[index] = this.mergeCurrentlyEditingManeuverNode(data[nodeName], index)
      this.addManeuverNodeOption(index)
      this.selectNodeToEdit(index)
      this.updateNodeOrbitInfo()
    }.bind(this))
  },

  removeManeuverNode: function(index){
    nodeName = "o.removeManeuverNode[" + index + "]"
    params = {}
    params[nodeName] = nodeName

    this.datalink.sendMessage(params, function(data){
      this.maneuverNodes.splice(index, 1)
      this.selectNodeToEdit(0)
      this.updateUI()
    }.bind(this))
  },

  quickIncrement: function(){
    return parseFloat(this.options.quickIncrement.value) || 0
  },

  quickIncrementUpdateField: function(field, factor){
    this.incrementField(field, (factor * this.quickIncrement()))
  },

  incrementField: function(field, delta){
    field.value = (parseFloat(field.value) || 0) + delta
    field.simulate('input')
  },

  initializeUI: function(){
    this.options.maneuverNode.observe('change', function(){
      this.updateUI()
    }.bind(this))

    var quickActions = function(field, increment, decrement){
      increment.observe('click', function(){
        this.quickIncrementUpdateField(field, +1)
      }.bind(this))

      decrement.observe('click', function(){
        this.quickIncrementUpdateField(field, -1)
      }.bind(this))
    }.bind(this)

    this.options.ut.observe('input', this.updateCurrentNode.bind(this))
    this.options.prograde.observe('input', this.updateCurrentNode.bind(this))
    this.options.normal.observe('input', this.updateCurrentNode.bind(this))
    this.options.radial.observe('input', this.updateCurrentNode.bind(this))

    quickActions(this.options.ut, this.options.utPlus, this.options.utMinus)
    quickActions(this.options.prograde, this.options.progradePlus, this.options.progradeMinus)
    quickActions(this.options.normal, this.options.normalPlus, this.options.normalMinus)
    quickActions(this.options.radial, this.options.radialPlus, this.options.radialMinus)

    this.options.ut1KPlus.observe('click', function(){
      this.incrementField(this.options.ut, 1000)
    }.bind(this))

    this.options.ut1KMinus.observe('click', function(){
      this.incrementField(this.options.ut, -1000)
    }.bind(this))

    this.options.utAp.observe('click', function(){
      this.options.ut.value = this.apoapsisTime
      this.options.ut.simulate('input')
    }.bind(this))

    this.options.utPe.observe('click', function(){
      this.options.ut.value = this.periapsisTime
      this.options.ut.simulate('input')
    }.bind(this))

    this.options.addNode.observe('click', function(){
      this.addManeuverNode()
    }.bind(this))
  },


  initializeDatalink: function(){
    this.datalink.subscribeToData(['o.maneuverNodes', 't.universalTime', 'o.timeToAp', 'o.timeToPe'])
    this.datalink.addReceiverFunction(this.update.bind(this))
  }
})