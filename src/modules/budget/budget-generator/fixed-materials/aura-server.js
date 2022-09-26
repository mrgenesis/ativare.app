'use strict';
//{ name: 'Servidor Aura', unitPrice: 1350, amount }
class AURAServer {
  #code = '-1';
  constructor (fixedMaterialsData, { amount = 0 }) {
    const AServ = fixedMaterialsData[this.#code];
    if (!AServ) {
      throw new Error(`O material código ${this.#code} dever ser lançado para fornecer dados para a class ${this.constructor.name}`);
    }
    this.name = AServ.name;
    this.unitPrice = AServ.unitPrice;        
    this.amount = amount;
    this.amountPrice = this.amount * AServ.unitPrice;      
  }
}
module.exports = AURAServer;
