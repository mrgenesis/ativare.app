'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;

  const Calc = require('../budget-generator/calc');

  async function findByCode(code, userAuth) {
    
    const calc = new Calc(this, Models.budget.findOne({ code }), Models.material.find({}));
    return calc.promisesAll().then(values => {
      const permissionsExplicitStatus = userAuth.getProperty('allowed');
      const currentUserCode = userAuth.userData.code;
      calc.setResult(values, permissionsExplicitStatus, currentUserCode);
      return calc.getResult();
    });

  }  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado', ['basic', 'privateDetails', 'seeAllBudgets']);
}

module.exports = getContextToFindByCode;
