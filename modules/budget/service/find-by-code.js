'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;

  const Calc = require('../budget-generator/calc');

  async function findByCode(code, allowedItems) {
    const calc = new Calc(Models.budget.findOne({ code }), Models.material.find({}));
    return calc.promisesAll().then(values => {
      try {
        calc.setResult(values);
        return calc.getAllowedItems(allowedItems);
      } catch (err) {
        throw this.createError(`Erro ao gerar o orçamento ${values[0].code} - ${err.message}`);
      }
    });

  }  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado');
}

module.exports = getContextToFindByCode;
