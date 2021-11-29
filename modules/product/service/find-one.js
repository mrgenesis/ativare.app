'use strict';

module.exports = function LoadFindOne(model) {
  return function findOne(product) {
    return model.findOne(product);
  }
};
