'use strict';

class Budget {
  constructor(productsList) {
    this.productsList = productsList;
    this.items = {};
  }
  generateItems() {
    this.productsList.forEach(item => {
      console.log(item)
      this.addPropertyIfHaveNot(this.items, item.floor, { [item.homeLocationName]: { config: item.configLocation, products: [] } });
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

function setContextToTtMiddleware(context) {
  return function create(src) {
    
    return function create(req, _, next) {
      console.log('Middleware create running.....')
      
      const { productsList, own, customer } = req.body;
      const budget = new Budget(productsList);

      budget.generateItems();
      const items = budget.getItems();
      src.addData({ propertyName: 'budget', value: { items, own, customer }});
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
