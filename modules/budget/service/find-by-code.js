'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;

  const Calc = require('../budget-generator/calc');

  async function findByCode(code, allowedItems) {
    const calc = new Calc(Models.budget.findOne({ code }), Models.material.find({}));
    return calc.promisesAll().then(values => {
      calc.setResult(values);
      return calc.getAllowedItems(allowedItems);
    });

  }  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado');
}

module.exports = getContextToFindByCode;