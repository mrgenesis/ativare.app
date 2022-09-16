'use strict';

function getModelAndContextToCreateService(context) {
  const { ServiceFactory } = context.Classes;
  const { budget } = context.model;

  function find(criteries, userHandler) {
    return budget.find(criteries).then(budgetList => {
      if (budgetList.lenght === 0) {
        return [];
      }
      if(userHandler.isGrantedResource('seeAll')) {
        return budgetList;
      }
      return budgetList.filter(b => b.own.code === userHandler.id);
    });
  }

  return new ServiceFactory(find, 'r', 'Localiza todos os registros com base no parâmetro informado.', ['seeAll']);
}

module.exports = getModelAndContextToCreateService;
