'use strict';

module.exports = MaterialModel => {
  function findOne(itemObj) {
    return MaterialModel.findOne(itemObj);
  }
  
  return { findOne };
}