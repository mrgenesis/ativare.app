'use strict';

class DetailsCreator {

  #total = 0;
  #floors = [];
  
  set addTotal(x) {
    this.#total += x;
  }
  setNewFloorIfHaveNot(floorName) {
    const Floor = require('./floor-creator');
    this.addPropertyIfHaveNot(this, floorName, new Floor);
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
      this.#total += this[floorName].amountPrice;
    });
  }
  setAURAServer() {    
    this.AURAServer = require('./fixed-materials')(1)['AURAServer'];
  }
  setUDX201(floorName) {
    this[floorName].uDX201.setUDX201AmountPerTotalMsNumber(this[floorName].amountMs);
    this[floorName].sumPriceInFloor(this[floorName].uDX201.amountPrice);
  }
  setEx214(floorName) {
    // TODO: Verificar se ao adicionar mais uDX201 aumentará a quantidade de portas
    this[floorName].ex214.setEX214AmountPerTotalPortNumber(this[floorName].amountPorts);
    this[floorName].sumPriceInFloor(this[floorName].ex214.amountPrice);
  }
  getTotal() {
    return this.#total;
  }
  
}
module.exports = DetailsCreator;
