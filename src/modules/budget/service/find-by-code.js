'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;
  const types = context.Helper.types();
  const comparator = context.Helper.comparator();

  const Calc = require('../budget-generator/calc');
  const adicionalsResources = ['basic', 'privateDetails', 'seeAllBudgets'];

  async function findByCode(code, userHandler) {
    const promises = Promise.all([Models.budget.findOne({ code }), Models.material.find({})]);
    
    const permissionsExplicitStatus = {};
    adicionalsResources.forEach(name => {
      if(userHandler.isGrantedResource(name)) {
        permissionsExplicitStatus[name] = true;
      }
    });

    return promises.then(values => {
      const budget = values[0];
      const materialsAll = values[1];
      const isAllowed = types.isTrue(permissionsExplicitStatus.seeAllBudgets) || comparator.areEquals(budget.own.code, userHandler.id);
      
      if (types.isFalseValue(budget)) {
        throw new context.AppError.ErrorCreator(`Este orçamento não existe`, 400);
      }

      if (isAllowed) {
        const calc = new Calc({ context, budget, materialsAll, permissionsExplicitStatus });
        return calc.getResult();
      }

      throw new context.AppError.ErrorCreator(`Você não tem acesso a esse recurso. Fale com o administrador`, 403);

    });
  }  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado', adicionalsResources);
}

module.exports = getContextToFindByCode;
