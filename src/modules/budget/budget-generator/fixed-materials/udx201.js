'use strict';
//{ name: 'uDX201', unitPrice: 1350, msLimit: 280, portLimit: 40, amount}
class uDX201 {
  #UDX201_UNIT_LIMIT_PORT = 40;
  #UDX201_LIMIT_MS = 280;
  constructor () {
    this.name = 'uDX201';
    this.unitPrice = 1350;        
    this.amount = 0;
    this.amountPrice = 0;      
    this.portLimit = 0;      
  }
  setAmount(totalMs) {
    this.amount = Math.ceil(totalMs / this.#UDX201_LIMIT_MS);
    this.updateValues();
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
    this.portLimit = this.amount * this.#UDX201_UNIT_LIMIT_PORT;
  }
}
module.exports = uDX201;
