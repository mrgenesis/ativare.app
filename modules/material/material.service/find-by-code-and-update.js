'use strict';

module.exports = MaterialModel => {
  function findByCodeAndUpdate(code, set) {
    return MaterialModel.findOneAndUpdate({ code }, set, { new: true });
  }
  
  return { findByCodeAndUpdate };
}