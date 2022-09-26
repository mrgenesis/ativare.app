'use strict';
const fixedMaterialsAmount = require('./fixed-materials-amount');

class DetailsCreator {

  #total = 0;
  #floors = [];
  fixedMaterialsSelectedAmount;
  constructor(fixedMaterials, budgetType) {
    this.fixedMaterialsData = fixedMaterials;
    this.fixedMaterialsSelectedAmount = fixedMaterialsAmount[budgetType];
  }
  
  set addTotal(x) {
    this.#total += parseInt(x, 10);
  }
  setNewFloorIfHaveNot(floorName) {
    const Floor = require('./floor-creator');
    this.addPropertyIfHaveNot(this, floorName, new Floor(this.fixedMaterialsData, this.fixedMaterialsSelectedAmount));
  }
  addPropertyIfHaveNot(obj, property, initialValue) {
    if (obj.hasOwnProperty(property)) {
      return true;
    }
    obj[property] = initialValue;
    return false;
  }
  setFloors(floorsNamesList) {
    this.#floors = floorsNamesList;
  }
  setTotals() {
    this.setAURAServer();
    this.#floors.forEach(floorName => {
      this.setUDX201(floorName);
      this.setEx214(floorName);
      this.setPanel(floorName);
      this.#total += this[floorName].amountPrice;
    });
  }
  setAURAServer() {    
    const fixedMaterialsContruc = require('./fixed-materials/fixed-materials');
    this.AURAServer = new fixedMaterialsContruc.AURAServer(this.fixedMaterialsData, this.fixedMaterialsSelectedAmount);
    this.#total += this.AURAServer.amountPrice;
  }
  setPanel(floorName) {
    this[floorName].addPrice = this[floorName].panel.amountPrice;
  }
  setUDX201(floorName) {
    this[floorName].uDX201.setAmount(this[floorName].amountMs);
    this[floorName].addPrice = this[floorName].uDX201.amountPrice;
  }
  setEx214(floorName) {
    this[floorName].ex214.setAmount(this[floorName].amountPorts, this[floorName].uDX201.portLimit);
    this[floorName].addPrice = this[floorName].ex214.amountPrice;
  }
  getTotal() {
    return this.#total;
  }
  addPercent(v) {
    this.percentValue = this.#total * parseFloat(v);
    this.addTotal = this.percentValue;
  }
}
module.exports = DetailsCreator;
