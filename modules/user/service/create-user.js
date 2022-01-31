'use strict';

module.exports = function setContext(context) {
  const { ServiceFactory } = context.Classes;

  function createUser(newUser) {
    return context.model.user.create(newUser);
  }

  return new ServiceFactory(createUser, 'w', 'Cria um novo usuário.');
};
