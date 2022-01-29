'use strict';

class ServiceFatory {
  #data; #name; #nameType;
  constructor(exec, type, displayDescription) {
    this.#name = Object.getOwnPropertyDescriptor(exec, 'name').value
    this.#data = { displayDescription, type, exec };
    this.#nameType = `${this.#name}_${this.#data.type}`;
  }
  get name() {
    return this.#name;
  }
  get nameType() {
    return this.#nameType;
  }
  get displayDescription() {
    return this.#data.displayDescription;
  }
  get type() {
    return this.#data.type;
  }
  get exec() {
    return this.#data.exec;
  }

}

module.exports = ServiceFatory;
