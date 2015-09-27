var DataTable = Class.create({
  initialize: function(tableID, dataRows){
    this.tableID = tableID
    this.table = $(this.tableID)
    this.dataRows = dataRows
  },

  update: function(){
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

        tableRow.down("td").update(row.value)
      }.bind(this))
    }.bind(this))
  },

  clear: function(){
    window.requestAnimationFrame(function(){
      this.dataRows = []
      this.table.innerHTML = ""
    }.bind(this))
  }
})