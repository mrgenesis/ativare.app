'use strict';

module.exports = function setContext(context) {
  const { ServiceFactory } = context.Classes;
  function create(product) {
    return context.model.product.create(product);
  }
  return new ServiceFactory(create, 'w', 'Registra um novo produto.');
};
