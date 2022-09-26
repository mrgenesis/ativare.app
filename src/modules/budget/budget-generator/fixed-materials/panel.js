'use strict';

class Panel {
  #code = '-5';
  constructor (fixedMaterialsData, { amount = 0 }) {
    const panel = fixedMaterialsData[this.#code];
    if (!panel) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = panel.name;
    this.unitPrice = panel.unitPrice;        
    this.amount = amount;
    this.amountPrice = this.amount * panel.unitPrice;
  }
}
module.exports = Panel;
