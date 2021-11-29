'use strict';

module.exports = MaterialModel => {
  function findAll() {
    return MaterialModel.find({});
  }
  
  return { findAll };
}