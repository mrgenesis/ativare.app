'use strict';

class multiplexedKeyPad {
  constructor () {
    this.name = 'Key Pad Multiplexado';
    this.unitPrice = 180;        
    this.amount = 0;
    this.amountPrice = 0;      
    this.ports = 8;      
    this.portLimit = 8;
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
