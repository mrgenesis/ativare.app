'use strict';

class Pulser {
  #code = '-7';
  constructor (fixedMaterialsData) {
    const pulser = fixedMaterialsData[this.#code];
    if (!pulser) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = pulser.name;
    this.unitPrice = pulser.unitPrice;        
    this.amount = 0;
    this.amountPrice = 0;      
  }
  set addAamount(amount) {
    const amountInt = parseInt(amount, 10);
    this.amount += amountInt;
    this.updateValues();
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
  }
}
module.exports = Pulser;
