'use strict';

class Pulser {
  constructor () {
    this.name = 'Pulsador';
    this.unitPrice = 120;        
    this.amount = 0;
    this.amountPrice = 0;      
  }
  set addAamount(amount) {
    const amountInt = parseInt(amount, 10);
    this.amount += amountInt;
    this.updateValues();
  }
  updateValues() {
    this.amountPrice = this.amount * this.unitPrice;
  }
}
module.exports = Pulser;
