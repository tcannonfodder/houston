var ReadoutTable = Class.create({
  initialize: function(datalink, tableId, dataRows){
    this.datalink = datalink
    this.tableId = tableId
    this.table = $(this.tableId)
    this.dataRows = dataRows
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.dataRows.forEach(function(row){
        var rowId = row.label
        var tableRow = this.table.down("tr[data-label='"+ rowId +"']")

        if(!tableRow){
          var tableRow = new Element("tr", {
            "data-label" : rowId
          })

          tableRow.insert("<th>" + row.label + "</th><td></td>")
          this.table.insert(tableRow)
        }

        tableRow.down("td").update(row.formatter(data[row.value]))
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    var dataValues = this.dataRows.map(function(dataRow){
      return dataRow.value
    })

    this.datalink.subscribeToData(dataValues)

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})