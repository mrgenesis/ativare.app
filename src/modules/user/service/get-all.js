'use strict';

module.exports = function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function getAll() {
    return context.model.user.find({});
  }
  
  return new ServiceFactory(getAll, 'r', 'Localiza todos os usuários do sistema.');
}
