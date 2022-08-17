'use strict';

const counter = require('./model.counter');
const group = require('./model.group');
const debug = require('./model.debug');


class Model {
  constructor() {
    this.counter = counter;
    this.group = group;
    this.debug = debug;
  }
  setModel(name, model) {
    this[name] = model;
  }
}

Model.type = 'model';
module.exports = Model;