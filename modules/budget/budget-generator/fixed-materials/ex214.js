'use strict';

class Ex214 {
  #UDX201_LIMIT_PORT = 40;
  #EX214_LIMIT_PORT = 40;
  constructor () {
    this.name = 'Expansão 214';
    this.unitPrice = 750;        
    this.amount = 0;
    this.amountPrice = 0;      
  }
  setAmount(totalPorts, uDX201LimitPort = this.#UDX201_LIMIT_PORT, ex214Limit = this.#EX214_LIMIT_PORT) {
    const withoutUDX201Value = parseInt(totalPorts, 10) - uDX201LimitPort;
    if (withoutUDX201Value > 0) {
      this.amount = Math.ceil(withoutUDX201Value / ex214Limit);
      return this.updateValues();
    }
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
  }
}
module.exports = Ex214;
