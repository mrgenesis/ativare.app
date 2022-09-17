'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findByCodeAndUpdate(code, set) {
    return context.model.material.findOneAndUpdate({ code }, set, { new: true }).then(result => {
      if(!result) {
        throw new context.AppError.ErrorCreator('O código informado não existe. Nenhum item foi atualizado.', 400);
      }
      return result;
    });
  }
  
  return new ServiceFactory(findByCodeAndUpdate, 'u', 'Cria um novo material.');
}

module.exports = setContext;
