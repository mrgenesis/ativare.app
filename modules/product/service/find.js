'use strict';

module.exports = function LoadFind(context) {
  const { ServiceFactory } = context.Classes;
  function find(filter = {}) {
    return context.model.product.find(filter);
  }
  return new ServiceFactory(find, 'r', 'Localiza uma lista de produtos.');
};
