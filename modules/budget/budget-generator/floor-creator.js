'use strict';

class FloorCreator {
  #configsKeys;
  constructor() {
    const fixedMaterials = require('./fixed-materials');

    this.totalConfigs = {
      I2CKeyPad: fixedMaterials(0)['I2CKeyPad'],
      multiplexedKeyPad: fixedMaterials(0)['multiplexedKeyPad'],
      point: fixedMaterials(0)['point'],
      pulser: fixedMaterials(0)['pulser'],
    }
    this.uDX201 = fixedMaterials(1)['uDX201'];
    this.ex214 = fixedMaterials(0)['ex214'];
    this.panel = fixedMaterials(1)['panel'];
    this.products = {};
    this.materials = {};
    this.amountMs = 0;
    this.amountPoints = 0;
    this.amountPorts = 0;
    this.amountPrice = 0;
    this.#configsKeys = Object.keys(this.totalConfigs);

  }

  addConfigValuesInFloor(locationConfig) { 
    this.#configsKeys.forEach(key => {
      this.totalConfigs[key].amountAdd = locationConfig[key];
    });
    this.sumI2CMsInFloor(locationConfig['I2CKeyPad']);
    this.sumMultiplexedKeyPadInFloor(locationConfig['multiplexedKeyPad']);
    this.sumPointInFloor(locationConfig['point']);
    this.sumPortInFloor(locationConfig['pulser']);
  }
  
  sumI2CMsInFloor(amount) {
    const I2CKeyPad = this.totalConfigs['I2CKeyPad'];
    this.amountMs += I2CKeyPad.ms * amount;
    this.amountPrice += I2CKeyPad.unitPrice * amount;
  }
  sumMultiplexedKeyPadInFloor(amount) {
    const multiplexedKeyPad = this.totalConfigs['multiplexedKeyPad'];
    this.amountPorts += multiplexedKeyPad.ports * amount;
    this.amountPrice += multiplexedKeyPad.unitPrice * amount;
  }
  sumPointInFloor(amount) {
    const pulser = this.totalConfigs['pulser'];
    this.amountPoints += amount;
    this.amountPrice += pulser.unitPrice * amount;
  }
  sumPortInFloor(amount) {
    this.amountPorts += amount;
  }
  addEqualProduct(product) {
    if (this.addPropertyIfHaveNot(this.products, product.productCode, product)) {
      this.products[product.productCode].amount += product.amount;
    }
  }
  addPropertyIfHaveNot(obj, property, initialValue) {
    if (obj.hasOwnProperty(property)) {
      return true;
    }
    obj[property] = initialValue;
    return false;
  }
  addEqualMeterial(mergedMaterial) {
    if (this.addPropertyIfHaveNot(this.materials, mergedMaterial.code, mergedMaterial)) {
      this.materials[mergedMaterial.code].amountFloatAdd = mergedMaterial.amountFloat;
      this.materials[mergedMaterial.code].chargeAdd = mergedMaterial.amountCharge;
    }
    this.sumPriceInFloor(mergedMaterial.amountPrice);
    this.sumMsMaterial(mergedMaterial.amountMs);
  }
  sumPriceInFloor(price) {
    this.amountPrice += price;
  }
  sumMsMaterial(amount) {
    this.amountMs += amount;
  }
}
module.exports = FloorCreator;
