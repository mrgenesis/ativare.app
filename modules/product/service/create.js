'use strict';

module.exports = function LoadCreate(model) {
  return function create(product) {
    return model.create(product);
  }
};
