'use strict';

class Ex214 {
  #code = '-2';
  #EX214_LIMIT_PORT = 40;
  constructor (fixedMaterialsData) {
    const ex214 = fixedMaterialsData[this.#code];
    if (!ex214) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = ex214.name;
    this.unitPrice = ex214.unitPrice;   
    this.#EX214_LIMIT_PORT = ex214.limit;
    this.amount = 0;
    this.amountPrice = 0;      
  }
  setAmount(totalBusyPorts, uDX201LimitPort) {
    if (typeof uDX201LimitPort === 'undefined') {
      throw new Error(`Na hora de definir a quantidade do material gerado pela class ${this.constructor.name}, é obrigatório informar o parâmetro uDX201LimitPort`);
    }
    const withoutUDX201Value = parseInt(totalBusyPorts, 10) - uDX201LimitPort;
    if (this.isBigestThenZero(withoutUDX201Value)) {
      this.amount = Math.ceil(withoutUDX201Value / this.#EX214_LIMIT_PORT);
      return this.updateValues();
    }
  }
  isBigestThenZero(v) {
    return v > 0;
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
  }
}
module.exports = Ex214;
