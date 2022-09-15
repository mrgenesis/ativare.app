'use strict';

class ServiceFactory {
  #data; #name; #nameType; #adicionalsResources;
  constructor(exec, type, displayDescription, adicionalsResources = []) {
    this.#name = Object.getOwnPropertyDescriptor(exec, 'name').value
    this.#data = { displayDescription, type, exec };
    this.#nameType = `${this.#name}_${this.#data.type}`;
    this.#adicionalsResources = this.adicionalsResourcesValidate(adicionalsResources);
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
  get adicionalsResources() {
    return this.#adicionalsResources;
  }
  adicionalsResourcesValidate(adicionalsResources) {
    const isIncorrectName = p => (/[^A-Za-z0-9]/).test(p);
    if(!Array.isArray(adicionalsResources) && adicionalsResources.some(isIncorrectName)) {
      throw new Error('adicionalsResources should be array and can have only letters and numbers');
    }
    return adicionalsResources;
  }

}

module.exports = ServiceFactory;
