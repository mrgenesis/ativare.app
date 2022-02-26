'use strict';

class Point {
  constructor () {
    this.name = 'Multiplexador';
    this.unitPrice = 120;        
    this.portLimit = 10;        
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
