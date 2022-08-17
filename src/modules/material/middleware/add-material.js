'use strict';

function setContext(context) {
  return function addMaterial(src) {
    return function addMaterial(req, res, next) {
      next();
    }

  }
}
module.exports = setContext;