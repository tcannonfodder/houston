var ResourceMonitor = Class.create({
  initialize: function(datalink, resourceName, options){
    this.datalink = datalink
    this.resourceName = resourceName
    this.options = Object.extend({
      currentStageProgressBar: null,
      totalProgressBar: null,
      valuePrefix: null
    }, options)

    this.resourceStrings = this.buildResourceStrings()

    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      if(this.options.totalProgressBar){
        this.options.totalProgressBar.value = data[this.resourceStrings.totalAvailable]
        this.options.totalProgressBar.max = data[this.resourceStrings.totalMax]
      }

      if(this.options.currentStageProgressBar){
        this.options.currentStageProgressBar.value = data[this.resourceStrings.currentStageAvailable]
        this.options.currentStageProgressBar.max = data[this.resourceStrings.currentStageMax]
      }

      this.updateValue("-total-value", data[this.resourceStrings.totalAvailable])
      this.updateValue("-total-max", data[this.resourceStrings.totalMax])

      this.updateValue("-current-stage-value", data[this.resourceStrings.currentStageAvailable])
      this.updateValue("-current-stage-max", data[this.resourceStrings.currentStageMax])
    }.bind(this))
  },

  updateValue: function(id, value){
    if($(this.options.valuePrefix + id)){
      if(value < 0){
        $(this.options.valuePrefix + id).update("NA")
      } else{
        $(this.options.valuePrefix + id).update(value.toFixed(2))
      }
    }
  },

  buildResourceStrings: function(){
    return {
      totalAvailable: "r.resource["+ this.resourceName +"]",
      totalMax: "r.resourceMax["+ this.resourceName +"]",
      currentStageAvailable: "r.resourceCurrent["+ this.resourceName +"]",
      currentStageMax: "r.resourceCurrentMax["+ this.resourceName +"]",
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      this.resourceStrings.totalAvailable,
      this.resourceStrings.totalMax,
      this.resourceStrings.currentStageAvailable,
      this.resourceStrings.currentStageMax
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})