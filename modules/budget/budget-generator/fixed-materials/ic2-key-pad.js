'use strict';

class I2CKeyPad {
  constructor () {
    this.name = 'Key Pad IC2';
    this.unitPrice = 120;        
    this.amount = 0;
    this.amountPrice = 0;      
    this.ms = 18.9;      
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
