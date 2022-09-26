'use strict';

class Point {
  #code = '-6';
  constructor (fixedMaterialsData) {
    const point = fixedMaterialsData[this.#code];
    if (!point) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = point.name;
    this.unitPrice = point.unitPrice;        
    this.portLimit = point.limit;        
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
module.exports = Point;
