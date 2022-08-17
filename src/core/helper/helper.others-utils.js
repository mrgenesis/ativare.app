'use strict';

function othersUtils () {

  class OthersUtils {
    log(trackingName, msg, rest = []) {
      return require('util').debuglog(trackingName)(msg, ...rest);
    }
  }
  return new OthersUtils();
  
}
othersUtils.priority = 1;
module.exports = othersUtils;
