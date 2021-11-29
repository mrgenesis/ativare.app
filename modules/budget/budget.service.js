'use strict';


module.exports = function budgetService(model) {
  const Models = this.models;
  const budgetCalc = require('./service/budget.calc');

  return {
    async create(newBudget) {
      const { code } = await model.create(newBudget);
      return code;
    },
    find(obj) {
      return model.find(obj);
    },
    async findByCode(code) {
      let budget = await model.findOne({ code });
      console.log('resultado do banco\n', budget)
      console.log('----------------------------------')
      if (!budget) return null;

      budget = budget.toObject();
      let selectMaterialsAll = await Models.materialModel().find({});
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

    },

  };
}