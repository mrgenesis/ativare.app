'use strict';

module.exports = function LoadUpdate(model) {
  return function update(obj, set) {
    return model.findOneAndUpdate(obj, set, { new: true });
  }
};
