'use strict';

module.exports = function setContext(context) {
  const { ServiceFactory } = context.Classes;
  function findOne(product) {
    return context.model.product.findOne(product);
  }
  return new ServiceFactory(findOne, 'r', 'Localiza apenas um produto com base no critério de pesquisa.');
};
