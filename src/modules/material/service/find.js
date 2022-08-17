'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findAll(limit = 10, skip = 0) {
    return context.model.material.find({}).limit(limit).skip(skip);
  }
  
  return new ServiceFactory(findAll, 'r', 'Localiza uma sequência de materiais.');
}

module.exports = setContext;