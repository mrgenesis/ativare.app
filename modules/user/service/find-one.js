'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function findOne(obj) {
    return context.model.user.findOne(obj);
  }

  return new ServiceFactory(findOne, 'r', 'Localiza um usuário com base no valor informado.');
}

module.exports = setContext;
