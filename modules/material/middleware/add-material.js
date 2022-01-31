'use strict';

function setContext(context) {
  return function addMaterial(src) {
    console.log('addMaterial received <<src>>...');
    return function addMaterial(req, res, next) {
      console.log('addMaterial addMaterial running...');
      next();
    }

  }
}
module.exports = setContext;