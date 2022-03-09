'use strict';

class ServiceFactory {
  #data; #name; #nameType; #permissions;
  constructor(exec, type, displayDescription, permissions = []) {
    this.#name = Object.getOwnPropertyDescriptor(exec, 'name').value
    this.#data = { displayDescription, type, exec };
    this.#nameType = `${this.#name}_${this.#data.type}`;
    this.#permissions = this.generatePermissionsName(permissions);
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
  get data() {
    return this.#data
  }
  get serviceNameInArn() {
    return this.#name + this.#permissions;
  }
  generatePermissionsName(permissions) {
    if (permissions.length === 0) {
      return '';
    }
    return `+${permissions.join('+')}`;
  }

}

module.exports = ServiceFactory;
