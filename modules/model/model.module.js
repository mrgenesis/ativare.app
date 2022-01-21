'use strict';

class Model {
  constructor() {
    this.counter = require('./model.counter');
    this.group = require('./model.group');
  }
}

Model.type = 'models';
module.exports = Model;