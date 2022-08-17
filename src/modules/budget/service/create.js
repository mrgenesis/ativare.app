'use strict';

function setContext(context) {
  const { ServiceFactory } = context.Classes;
  const { budget } = context.model;

  async function create(newBudget) {
    console.log('this >>>>>>>>>>>>>>>>>>>>>', this)
    const { code } = await budget.create(newBudget);
    return code;
  }

  
  return new ServiceFactory(create, 'w', 'Cria um novo orçamento usando a lista de produtos');
}

module.exports = setContext;