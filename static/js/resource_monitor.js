var ResourceMonitor = Class.create({
  initialize: function(datalink, resourceName, options){
    this.datalink = datalink
    this.resourceName = resourceName
    this.options = Object.extend({
      currentStageProgressBar: null,
      totalProgressBar: null
    }, options)

    this.resourceStrings = this.buildResourceStrings()

    this.initializeDatalink()
  },

  update: function(data){
    if(this.options.totalProgressBar){
      this.options.totalProgressBar.value = data[this.resourceStrings.totalAvailable]
      this.options.totalProgressBar.max = data[this.resourceStrings.totalMax]
    }

    if(this.options.currentStageProgressBar){
      this.options.currentStageProgressBar.value = data[this.resourceStrings.currentStageAvailable]
      this.options.currentStageProgressBar.max = data[this.resourceStrings.currentStageMax]
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