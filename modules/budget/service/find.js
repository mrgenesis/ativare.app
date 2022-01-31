'use strict';

function getModelAndContextToCreateService(context) {
  const { ServiceFactory } = context.Classes;
  const { budget } = context.model;

  function find(newBudget) {
    return budget.find(newBudget);
  }

  return new ServiceFactory(find, 'r', 'Localiza todos os registros com base no parâmetro informado.');
}

module.exports = getModelAndContextToCreateService;
