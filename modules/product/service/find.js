'use strict';

module.exports = function LoadFind(model) {
  return function find(product) {
    return model.find(product);
  }
};
