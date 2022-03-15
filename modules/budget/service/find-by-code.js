'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;

  const Calc = require('../budget-generator/calc');

  async function findByCode(code, userAuth) {
    const promises = Promise.all([Models.budget.findOne({ code }), Models.material.find({})]);
    const permissionsExplicitStatus = userAuth.getProperty('allowed');
    const currentUserCode = userAuth.userData.code;

    return promises.then(values => {
      const budget = values[0];
      const materialsAll = values[1];
      if (budget && (permissionsExplicitStatus.seeAllBudgets === true || budget.own.code === currentUserCode)) {
        const calc = new Calc({ context, budget, materialsAll, permissionsExplicitStatus });
        return calc.getResult();
      }
      throw context.AppError.createError(new Error(`Este orçamento não existe ou você não tem acesso a ele.`), 400);
    });

  }  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado', ['basic', 'privateDetails', 'seeAllBudgets']);
}

module.exports = getContextToFindByCode;
