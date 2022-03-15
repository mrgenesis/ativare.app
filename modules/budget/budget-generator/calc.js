'use strict';

class BudgetGenerator {
  #materialsAll; #context;
  constructor({ context, budget, materialsAll, permissionsExplicitStatus }) {
    this.#context = context;
    this.budget = budget;
    this.#materialsAll = materialsAll;
    this.permissionsExplicitStatus = permissionsExplicitStatus;

    this.keys = { floors: [], homeLocations: {} };
    this.details = new (require('./details-creator'))();
    this.result = {};
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

      this.keys.homeLocations[floorName].forEach(homeLocation => {
        const location = this.budget.items[floorName][homeLocation];
        this.details[floorName].addConfigAmountInFloor(location.config);
        this.details[floorName].AddMsChargeInFloor(location.config);
        this.details[floorName].AddPortChargeInFloor(location.config);
        this.details[floorName].AddAmountPriceInFloor(location.config);
        
        this.joinEqualProducts(floorName, location);
      });
      
    });
    this.setMaterialsMerged();
  }
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
    this.details.setTotals();
    this.details.addPercent(this.budget.customer.percent);
  }
  getResult() {
    const { basic, privateDetails } = this.permissionsExplicitStatus;
    if (basic !== true) {
      throw this.#context.AppError.createError(new Error(`É necessário ter acesso ao recurso básico do orçamento para conseguir visualizá-lo.`), 400);
    }
    this.result = this.getBasicBudgetProperties();
    this.getPrivateDetails(privateDetails);
    return this.result;
  }
  getBasicBudgetProperties() {
    const budget = {};
    budget.customer = this.budget.customer;
    budget.code = this.budget.code;
    budget.createAt = this.budget.createAt;
    budget.productsList = this.budget.items;
    budget.total = this.details.getTotal();
    budget.budgetFloors = this.keys.floors;
    budget.own = this.budget.own;
    return budget;
  }
  getPrivateDetails(privateDetails) {
    if (privateDetails === true) {
      this.result.privateDetails = this.details;
    }
  }
}

module.exports = BudgetGenerator;
