'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findByCodeAndUpdate(code, set) {
    return context.model.material.findOneAndUpdate({ code }, set, { new: true });
  }
  
  return new ServiceFactory(findByCodeAndUpdate, 'u', 'Cria um novo material.');
}

module.exports = setContext;
