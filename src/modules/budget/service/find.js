'use strict';

function getModelAndContextToCreateService(context) {
  const { ServiceFactory } = context.Classes;
  const { budget } = context.model;

  function find(newBudget, userAuth) {
    const promBudgetList = budget.find(newBudget);
    const permissions = userAuth.getProperty('allowed');

    return promBudgetList.then(budgetList => {
      if (budgetList.lenght === 0) {
        return [];
      }
      if(permissions.seeAll === true) {
        return budgetList;
      }
      return budgetList.filter(b => b.own.code === userAuth.userData.code);
    });
  }

  return new ServiceFactory(find, 'r', 'Localiza todos os registros com base no parâmetro informado.', ['seeAll']);
}

module.exports = getModelAndContextToCreateService;
