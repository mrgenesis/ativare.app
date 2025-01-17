'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findOne(itemObj) {
    return context.model.material.findOne(itemObj).then(result => {
      if(!result) {
        throw new context.AppError.ErrorCreator('Não existe nenhum item com o código informado.', 400);
      }
      return result;
    });
  }
  
  return new ServiceFactory(findOne, 'r', 'Cria um novo material.');
}

module.exports = setContext;
