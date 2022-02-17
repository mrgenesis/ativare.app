'use strict';

class BudgetGenerator {
  #promiseAll; #materialsAll; 
  constructor(budgetPromise, materialPromise) {
    this.#promiseAll = Promise.all([budgetPromise, materialPromise]); 
    this.keys = { floors: [], homeLocations: {} };
    this.details = new (require('./details-creator'))();
  }
  promisesAll() {
    return this.#promiseAll;
  }
  setResult(result) {
    this.budget = result[0];
    this.#materialsAll = result[1];
    this.setKeys();
  }
  setKeys() {
    this.keys.floors = Object.keys(this.budget.items);
    this.keys.floors.forEach((floor) => {
      this.keys.homeLocations[floor] = Object.keys(this.budget.items[floor]);      
    });
    this.details.setFloors(this.keys.floors);
    this.addConfigValuesInFloors();
  }
  addConfigValuesInFloors() {
    this.keys.floors.forEach(floorName => {
      


      this.details.setNewFloorIfHaveNot(floorName);

      // this.setNewFloorIfHaveNot(floorName);

      this.keys.homeLocations[floorName].forEach(homeLocation => {
        const location = this.budget.items[floorName][homeLocation];
        this.details[floorName].addConfigValuesInFloor(location.config);
        
        this.joinEqualProducts(floorName, location);
      });
      
    });
    this.setMaterialsMerged();
  }
  // setNewFloorIfHaveNot(floorName) {
  //   const Floor = require('./floor-creator');
  //   this.addPropertyIfHaveNot(this.details, floorName, new Floor);
  // }
  addPropertyIfHaveNot(obj, property, initialValue) {
    if (obj.hasOwnProperty(property)) {
      return true;
    }
    obj[property] = initialValue;
    return false;
  }
  joinEqualProducts(floor, location) {
    location.products.forEach(product => {
      this.details[floor].addEqualProduct(product);
    });
  }
  setMaterialsMerged() {    
    this.keys.floors.forEach(floor => {
      const productsCodeList = Object.keys(this.details[floor].products);
      productsCodeList.forEach(productCode => {
        const product = this.details[floor].products[productCode];
        product.materials.forEach(materialProduc => {
          const materialOfDB = this.#materialsAll.find(material => materialProduc.code === material.code);

          const MergedMaterialCreator = require('./merged-material-creator');
          const mergedMaterial = new MergedMaterialCreator({ materialOfDB, materialProduc, productAmount: product.amount });
          this.details[floor].addEqualMeterial(mergedMaterial);
        });
      });
    });
    this.details.setTotals()
    this.setProperties();
  }
  setAURAServer() {    
    this.AURAServer = require('./fixed-materials')(1)['AURAServer'];
  }
  setProperties() {
    //['customer','own','productsList','budgetFloors','privateDetail']
    this.code = this.budget.code;
    this.customer = { name: 'Jon Doe', email: 'jon.doe@dev.com', phone: '11955557799' }
    this.own = { name: 'Jon Doe' };
    this.productsList = this.budget.items;
    this.budgetFloors = this.keys.floors;
    this.createAt = this.budget.createAt;
    this.privateDetails = this.details;
    this.total = this.details.getTotal();
  }
  getAllowedItems(propertiesList) {
    const result = {}; console.log('propertiesList', propertiesList)
    propertiesList.forEach(property => {
      result[property] = this[property];
    });
    return result;
  }


}
// const calc = new BudgetGenerator(Promise.resolve(require('./fixtures/budget')), Promise.resolve(require('./fixtures/materials')));

// calc.promisesAll().then(values => {
//   calc.setResult(values);
//   console.log(JSON.stringify(calc, function(key, value) {
//     if (key == 'budget' || key == 'products' || key == 'materials') {
//       return key;
//     }
//     return value;
//   }, '\t'));
//   // console.log(calc);
// });

module.exports = BudgetGenerator;
