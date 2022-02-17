'use strict';

module.exports = class MergedMaterialCreator {
  constructor ({ materialOfDB, materialProduc, productAmount }) {
    this.code = materialOfDB.code;
    this.name = materialOfDB.name;
    this.unitPrice = materialOfDB.unitPrice;
    this.ms = materialOfDB.ms;
    this.limit = materialOfDB.limit;
    this.amountCharge = productAmount * materialProduc.charge;
    this.amountFloat = this.amountCharge / this.limit;
    
    this.amount = 0;
    this.setAmount();

    this.amountPrice = 0;
    this.setAmountPrice();
    
    this.amountMs = 0;
    this.setAmountMs();

  }
  setAmount() {
    this.amount = Math.ceil(this.amountFloat);    
  }
  setAmountPrice() {
    this.amountPrice = this.amount * this.unitPrice;
  }
  setAmountMs() {
    this.amountMs = this.amount * this.ms;
  }
  set amountFloatAdd(x) {
    this.amountFloat += x;
    this.setAmount();
    this.setAmountPrice();
    this.setAmountMs();
  }
  set chargeAdd(x) {
    this.amountCharge += x;
  }
};
