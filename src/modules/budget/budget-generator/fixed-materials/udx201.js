'use strict';
//{ name: 'uDX201', unitPrice: 1350, msLimit: 280, portLimit: 40, amount}
class uDX201 {
  #code = '-8';
  #UDX201_MAX_MS = 280;
  #UDX201_UNIT_LIMIT_PORT = 40;
  constructor (fixedMaterialsData) {
    const udx = fixedMaterialsData[this.#code];
    if (!udx) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = udx.name;
    this.unitPrice = udx.unitPrice; 
    this.#UDX201_MAX_MS = udx.ms;
    this.#UDX201_UNIT_LIMIT_PORT = udx.limit;
    this.amount = 0;
    this.amountPrice = 0;      
    this.portLimit = 0;      
  }
  setAmount(totalMs) {
    this.amount = Math.ceil(this.setZeroIfIsZeroOrSmallest(totalMs) / this.#UDX201_MAX_MS);
    this.updateValues();
  }
  setZeroIfIsZeroOrSmallest(totalMs) {
    return this.isBigestThanZero(totalMs) ? totalMs : 0;
  }
  isBigestThanZero(v) {
    return v > 0;
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
    this.portLimit = this.amount * this.#UDX201_UNIT_LIMIT_PORT;
  }
}
module.exports = uDX201;
