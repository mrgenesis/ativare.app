'use strict';

module.exports = function LoadUpdate(context) {
  const { ServiceFactory } = context.Classes;
  function update(obj, set) {
    return context.model.product.findOneAndUpdate(obj, set, { new: true });
  }
  return new ServiceFactory(update, 'u', 'Atualiza um produto.');
};
