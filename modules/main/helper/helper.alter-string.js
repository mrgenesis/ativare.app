'use strict';

function stringManipulation() {
  class stringManipulation {

    firstLetterUpperCase(str) {
      return str.replace(str[0], str[0].toUpperCase());
    }
    
  }

  return new stringManipulation();
}
stringManipulation.priority = 1;
module.exports = stringManipulation;