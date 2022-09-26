'use strict';

class multiplexedKeyPad {
  #code = '-4';
  constructor (fixedMaterialsData) {
    const multKey = fixedMaterialsData[this.#code];
    if (!multKey) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = multKey.name;
    this.unitPrice = multKey.unitPrice;        
    this.ports = 8;      
    this.portLimit = 8;
    this.amount = 0;
    this.amountPrice = 0;      
  }
  set addAmount(amount) {
    this.amount += parseInt(amount, 10);
    this.updateValues();
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
  }
}
module.exports = multiplexedKeyPad;
