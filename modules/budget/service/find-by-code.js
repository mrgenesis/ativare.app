'use strict';

function getContextToFindByCode(context) {
  const { ServiceFactory } = context.Classes;
  const Models = context.model;
  const budgetCalc = require('../budget-calc/budget-calc');


  async function findByCode(code) {
    let budget = await Models.budget.findOne({ code });
    if (!budget) return null;

    budget = budget.toObject();
    let selectMaterialsAll = await Models.material.find({});

    // console.log('resultado do banco. Budget e Material >>>>>>>>>>>>>>', budget, selectMaterialsAll)
    let { total, materialsPrivateDetails, budgetFloors } = budgetCalc(budget.productsList, selectMaterialsAll);
    budget['budgetFloors'] = budgetFloors;
    budget['total'] = total;


    if (true) { // TODO: Colocar restrição para executar apenas em logins com perfil admin
      budget['privateDetail'] = {
        materials: materialsPrivateDetails
      };
    }
    
    console.log('orçamento processado\n', budget)

    return budget;

  }

  
  return new ServiceFactory(findByCode, 'r', 'Permite ver o orçamento com base no código informado');
}

module.exports = getContextToFindByCode;