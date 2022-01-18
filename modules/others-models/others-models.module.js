'use strict';

class OthersModels {
  constructor() {
    this.counter = require('./others-models.counter');
    this.group = require('./others-models.group');
  }
}

OthersModels.type = 'models';
module.exports = OthersModels;