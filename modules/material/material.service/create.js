'use strict';

module.exports = MaterialModel => {
  function create(newMaterial) {
    return MaterialModel.create(newMaterial);
  }

  function findPagination(limit, skip) {
    return MaterialModel.find({}).limit(limit).skip(skip);
  }
  
  return { create, findPagination };
}