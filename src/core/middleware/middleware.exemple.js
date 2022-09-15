'use strict';

function execExemple(context) {
  function exemple(src) {
    return function exemple(_, __, next) {
      return next();
    }
  }
  exemple.type = 'global';
  return exemple;
}

module.exports = execExemple;
