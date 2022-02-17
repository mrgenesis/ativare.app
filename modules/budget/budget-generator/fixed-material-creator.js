'use strict';

class FixedMaterialCreator {
  #UDX201_LIMIT_MS = 280;
  #UDX201_LIMIT_PORT = 40;
  #EX214_LIMIT_PORT = 40;
  constructor ({ name, unitPrice, amount, ms, msLimit, portLimit, ports }) {
    this.name = name;
    this.unitPrice = unitPrice;        
    this.amount = amount;
    this.amountPrice = amount * unitPrice;       
    (msLimit) ? this.msLimit = msLimit : '';        
    (ms) ? this.ms = ms : '';        
    (ms) ? this.amountMs = amount * ms : '';        
    (portLimit) ? this.portLimit = portLimit : '';        
    (ports) ? this.ports = ports : '';        
  }
  // get amountPrice() {
  //   return this.unitPrice * this.amount;
  // }
  set amountAdd(x) {
    this.amount += x;
    this.amountPrice = this.amount * this.unitPrice;  
    (this.ms) ? this.amountMs += x * this.ms : '';
  }
  setUDX201AmountPerTotalMsNumber(amountMs, uDX201LimitMs = this.#UDX201_LIMIT_MS) {
    this.amount = Math.ceil(amountMs / uDX201LimitMs);
    this.amountPrice = this.amount * this.unitPrice;  
  }
  setEX214AmountPerTotalPortNumber(totalPorts, uDX201LimitPort = this.#UDX201_LIMIT_PORT, ex214Limit = this.#EX214_LIMIT_PORT) {
    const withoutUDX201Value = totalPorts - uDX201LimitPort;
    this.amount = Math.ceil(withoutUDX201Value / ex214Limit);
    this.amountPrice = this.amount * this.unitPrice;  
  }
}
module.exports = FixedMaterialCreator;
