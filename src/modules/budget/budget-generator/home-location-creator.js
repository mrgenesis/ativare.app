'use strict';

class HomeLocationCreator {
  constructor() {
    const fixedMaterials = require('./fixed-materials');

    this.subTotalConfig = {
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
    this.amountPrice = 0;
  }
  configAdd(location) {
    this.subTotalConfigAdd(location);
  }
  subTotalConfigAdd(location) {
    const configs = Object.keys(this.subTotalConfig);
    configs.forEach(configItem => {
      this.subTotalConfig[configItem].ms ? this.msAdd(this.subTotalConfig[configItem].ms, this.subTotalConfig[configItem].amount) : '';
      this.subTotalConfig[configItem].amountAdd = location.config[configItem];
    });
  }
  msAdd(ms, amount = 1) {
    const totalMs = ms * amount;
    this.amountMs += totalMs;
  }
}
module.exports = HomeLocationCreator;
