var DataFormatters = {
  distanceString: function(value){
    return numeral(value).format('0,0.000 a') + "m"
  },

  heightFromTerrainString: function(value){
    if(value <= -1 ){ return "NA" }
    return numeral(value).format('0,0.000 a') + "m"
  },

  degreeString: function(value){
    return numeral(value).format('0.000') + "&deg;"
  },

  velocityString: function(value){
    return numeral(value).format('0,0.000 a') + "m/s"
  }
}