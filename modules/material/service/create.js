'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function create(newMaterial) {
    return context.model.material.create(newMaterial);
  }
  
  return new ServiceFactory(create, 'w', 'Cria um novo material.');
}

module.exports = setContext;