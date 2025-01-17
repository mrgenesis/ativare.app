'use strict';

class FloorCreator {
  #configsKeys;
  constructor(fixedMaterialsData, fixedAmount) {
    const fixedMaterialsConstruc = require('./fixed-materials/fixed-materials');

    this.totalConfigs = {
      I2CKeyPad: new fixedMaterialsConstruc.I2CKeyPad(fixedMaterialsData),
      multiplexedKeyPad: new fixedMaterialsConstruc.multiplexedKeyPad(fixedMaterialsData),
      point: new fixedMaterialsConstruc.point(fixedMaterialsData),
      pulser: new fixedMaterialsConstruc.pulser(fixedMaterialsData),
    }
    this.uDX201 = new fixedMaterialsConstruc.uDX201(fixedMaterialsData);
    this.ex214 = new fixedMaterialsConstruc.ex214(fixedMaterialsData);
    
    this.panel = new fixedMaterialsConstruc.panel(fixedMaterialsData, fixedAmount.panel);
    this.products = {};
    this.materials = {};
    this.amountMs = 0;
    this.amountPoints = 0;
    this.amountPorts = 0;
    this.amountPrice = 0;
    this.#configsKeys = Object.keys(this.totalConfigs);
  }
  set addMs(ms) {
    this.amountMs += parseInt(ms, 10);
  }
  set addPrice(price) {
    this.amountPrice += parseInt(price, 10);
  }
  set addPoints(points) {
    this.amountPoints += parseInt(points, 10);
  }
  set addPorts(ports) {
    this.amountPorts += parseInt(ports, 10);
  }
  
  addConfigAmountInFloor(locationConfig) {
    this.#configsKeys.forEach(key => {
      this.totalConfigs[key].addAmount = locationConfig[key];
    });
  }
  AddMsChargeInFloor(locationConfig) {
    this.addMs = this.totalConfigs['I2CKeyPad'].ms * locationConfig['I2CKeyPad'];
  }
  AddPortChargeInFloor(locationConfig) {
    this.addPorts = this.totalConfigs['multiplexedKeyPad'].ports * locationConfig['multiplexedKeyPad'];
    this.addPorts = locationConfig['pulser'];
  }
  AddAmountPriceInFloor(locationConfig) {
    this.addPrice = this.totalConfigs['I2CKeyPad'].unitPrice * locationConfig['I2CKeyPad'];
    this.addPrice = this.totalConfigs['multiplexedKeyPad'].unitPrice * locationConfig['multiplexedKeyPad'];
    this.addPrice = this.totalConfigs['point'].unitPrice * locationConfig['point'];
    this.addPrice = this.totalConfigs['pulser'].unitPrice * locationConfig['pulser'];
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
    this.addPrice = mergedMaterial.amountPrice;
    this.addMs = mergedMaterial.amountMs;
  }
}
module.exports = FloorCreator;
