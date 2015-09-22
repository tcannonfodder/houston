var StagingInfoTable = Class.create({
  initialize: function(datalink, stagingInfoTableID){
    this.datalink = datalink
    this.stagingInfoTableID = stagingInfoTableID

    this.stagingInfoTable = $(this.stagingInfoTableID)
    this.stagingInfoTableHeader = null
    this.stagingInfoTableBody = null

    this.currentBody = null

    this.initializeTable()
    this.initializeDatalink()
  },

  update: function(data){
    if(!data['mj.stagingInfo']){
      this.stagingInfoTableBody.update("")
      return
    }

    //update the body as necessary
    if(this.currentBody == null || this.currentBody.name != data['v.body']){
      this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    }

    var stagingInfo = data['mj.stagingInfo']
    var stages = stagingInfo['atmo'].length
    if(stages <= 0){ return }

    var documentFragment = document.createDocumentFragment()
    for (var i = 0; i < stages; i++) {
      var stageAtmo = stagingInfo["atmo"][i]
      var stageVacuum = stagingInfo["vacuum"][i]

      var row = document.createElement("tr")

      var thrust = Math.min(stageAtmo["startThrust"],
        stageVacuum["startThrust"]
      )

      var TWR = OrbitalMath.TWR(thrust, stageAtmo["startMass"],
        this.currentBody.surfaceGravity
      )

      if(isNaN(TWR)){ TWR = 0.00 }

      var maxAccel = Math.min(stageAtmo["maxAccel"],stageVacuum["maxAccel"])

      var MaxTWR = OrbitalMath.MaxTWR(maxAccel,
        this.currentBody.surfaceGravity
      )

      if(isNaN(MaxTWR)){ MaxTWR = 0.00 }

      var ISP = Math.min(stageAtmo["isp"],stageVacuum["isp"])

      var atmoDeltaV = stageAtmo["deltaV"]
      var vacuumDeltaV = stageVacuum["deltaV"]

      var time = Math.min(stageAtmo["deltaTime"],stageVacuum["deltaTime"])

      this.addColumnToRow(row, i) //stage
      //start mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["startMass"]))
      //end mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["endMass"]))

      //staged mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["stagedMass"]))

      //burned mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["resourceMass"]))

      //TWR
      this.addColumnToRow(row, DataFormatters.plainNumberString(TWR))

      //Max TWR
      this.addColumnToRow(row, DataFormatters.plainNumberString(MaxTWR))

      //ISP
      this.addColumnToRow(row, DataFormatters.plainNumberString(ISP))

      //atmo delta v
      this.addColumnToRow(row, DataFormatters.velocityString(atmoDeltaV))

      //vacuum delta v
      this.addColumnToRow(row, DataFormatters.velocityString(vacuumDeltaV))

      // time
      this.addColumnToRow(row, DataFormatters.timeString(time))

      documentFragment.appendChild(row)
    }

    window.requestAnimationFrame(function(){
      this.stagingInfoTableBody.innerHTML = ""
      this.stagingInfoTableBody.appendChild(documentFragment)
    }.bind(this))
  },

  addColumnToRow: function(row, columnValue){
    row.appendChild(document.createElement("td").update(columnValue))
  },

  initializeTable: function(){
    var documentFragment = document.createDocumentFragment()
    this.stagingInfoTableHeader = document.createElement("thead")
    var headerRow = this.stagingInfoTableHeader.appendChild(document.createElement("tr"))

    var columns = ["Stage", "Start Mass", "End Mass", "Staged Mass",
      "Burned Mass", "TWR", "Max TWR", "ISP", "Atmo &Delta;V", "Vac &Delta;V",
      "Time"
    ]

    for (var i = 0; i < columns.length; i++) {
      var name = columns[i]
      var element = document.createElement("th")
      element.update(name)
      headerRow.appendChild(element)
    };

    this.stagingInfoTableBody = document.createElement("tbody")

    documentFragment.appendChild(this.stagingInfoTableHeader)
    documentFragment.appendChild(this.stagingInfoTableBody)

    this.stagingInfoTable.appendChild(documentFragment)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['mj.stagingInfo', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})