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
  },

  temperatureString: function(value){
    if(!value){return "NA"}
    return numeral(value).format('0,000') + "&deg;C"
  },

  accelerationSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "G"
  },

  pressureSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "Pa"
  },

  gravitySensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000 a') + "m/s&sup2;"
  },
}