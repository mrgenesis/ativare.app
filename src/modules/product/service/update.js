'use strict';

module.exports = function LoadUpdate(context) {
  const { ServiceFactory } = context.Classes;
  function update(obj, set) {
    return context.model.product.findOneAndUpdate(obj, set, { new: true }).then(result => {
      if(!result) {
        throw new context.AppError.ErrorCreator('O código informado não existe. Nenhum item foi atualizado.', 400);
      }
      return result;
    });
  }
  return new ServiceFactory(update, 'u', 'Atualiza um produto.');
};
