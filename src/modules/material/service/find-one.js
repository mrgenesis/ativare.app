'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findOne(itemObj) {
    return context.model.material.findOne(itemObj);
  }
  
  return new ServiceFactory(findOne, 'r', 'Cria um novo material.');
}

module.exports = setContext;
