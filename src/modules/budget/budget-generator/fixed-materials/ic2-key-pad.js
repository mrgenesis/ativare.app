'use strict';

class I2CKeyPad {
  #code = '-3';
  constructor (fixedMaterialsData) {
    const i2c = fixedMaterialsData[this.#code];
    if (!i2c) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = i2c.name;
    this.unitPrice = i2c.unitPrice;        
    this.ms = i2c.ms;   

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
module.exports = I2CKeyPad;
