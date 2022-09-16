'use strict';
class Budget {
  constructor(productsList) {
    this.productsList = productsList;
    this.items = {};
  }
  generateItems() {
    this.productsList.forEach(item => {
      debugger;
      this.addPropertyIfHaveNot(this.items, item.floor, { [item.homeLocationName]: { config: item.configLocation, products: [] } });
      this.addPropertyIfHaveNot(this.items[item.floor], item.homeLocationName, {  config: item.configLocation, products: [] });
      this.items[item.floor][item.homeLocationName].products.push(item);
    });
  }
  getItems() {
    return this.items;
  }
  addPropertyIfHaveNot(obj, property, initialValue) {
    if (obj.hasOwnProperty(property)) {
      return true;
    }
    obj[property] = initialValue;
    return false;
  }
}

function setContext(context) {
  const { ServiceFactory } = context.Classes;

  async function create(body, authInfo) {
    let newBudget
      , own = {
        email: authInfo.preferred_username,
        name: authInfo.name,
        code: authInfo.oid
      };
    const { productsList, customer } = body;
    const budget = new Budget(productsList);

    budget.generateItems();
    const items = budget.getItems();
    newBudget = { items, own, customer };
    const { code } = await context.model.budget.create(newBudget);
    return code;
  }
  return new ServiceFactory(create, 'w', 'Cria um novo orçamento usando a lista de produtos');
}

module.exports = setContext;