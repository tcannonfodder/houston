// Extracted Richard Bunt's work in Telemachus: https://github.com/richardbunt/Telemachus/blob/master/WebPages/WebPages/src/console.js

var TimeFormatters = {
  formatUT: function(t){
    var day, year;
    if (t == null) {
      t = 0;
    }
    year = ((t / (365 * 24 * 3600)) | 0) + 1;
    t %= 365 * 24 * 3600;
    day = ((t / (24 * 3600)) | 0) + 1;
    t %= 24 * 3600;
    return "Year " + year + ", Day " + day + ", " + (this.hourMinSec(t)) + " UT";
  },

  formatMET: function(t){
    var result;
    if (t == null) {
      t = 0;
    }
    result = "T+";
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + ":";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0:";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + ":";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t) + " MET";
  },

  hourMinSec: function(t) {
    var hour, min, sec;
    if (t == null) {
      t = 0;
    }
    hour = (t / 3600) | 0;
    if (hour < 10) {
      hour = "0" + hour;
    }
    t %= 3600;
    min = (t / 60) | 0;
    if (min < 10) {
      min = "0" + min;
    }
    sec = (t % 60 | 0).toFixed();
    if (sec < 10) {
      sec = "0" + sec;
    }
    return "" + hour + ":" + min + ":" + sec;
  },

  durationString: function(t) {
    var result;
    if (t == null) {
      t = 0;
    }
    result = t < 0 ? "-" : "";
    t = Math.abs(t);
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + " years ";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0 days ";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + " days ";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t);
  }
}