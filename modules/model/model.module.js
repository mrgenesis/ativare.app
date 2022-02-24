'use strict';

class Model {
  constructor() {
    this.counter = require('./model.counter');
    this.group = require('./model.group');
    this.debug = require('./model.debug');
  }
  setModel(name, model) {
    this[name] = model;
  }
}

Model.type = 'model';
module.exports = Model;