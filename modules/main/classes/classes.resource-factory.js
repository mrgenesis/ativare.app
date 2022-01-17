'use strict';

class ResourceFactory {
  #name = '';
  #src = {};
  #services = {};
  #entry = '';
  #types = ['r', 'w', 'u', 'd'];
  constructor(name){
    this.#name = name.replace('Module', '');
    this.#entry = `/${this.#name.toLowerCase()}`;
  }

  getName() {
    return this.#name;
  }
  getEntry() {
    return this.#entry;
  }
  getResource(localName) {
    return { ...this.#src[localName] };
  }
  getResourcesAll() {
    return { ...this.#src };
  }
  setResource({ name = '', type = '', method = '', ...props }) { 
    const localName = `${name}.${type}`;
    this.#src[localName] = {};
    this.#src[localName].method = method.toLowerCase();
    this.#src[localName].arn = `${name}.${props.service}@${this.#name}.${type.toLowerCase()}`;
    this.#src[localName].relativePath = `/${name}`;
    this.#src[localName].path = `${this.#entry}/${name}`;
    this.#src[localName].service = this.getService(`${props.service || name}@${this.#name}.${type.toLowerCase()}`);
  }
  setResources(arr) {
    arr.forEach(routeConfig => {
      this.setResource(routeConfig);
    });
  }
  setService({ name, ...props }) {
    this.#services[`${name}@${this.#name}.${props.type}`] = {
      name, ...props
    }
  }
  setServices(arr) {
    arr.forEach(service => {
      this.setService(service);
    });
  }
  getService(service = '') {
    return this.#services[service];
  }
  getServices(services = []) {
    return services.reduce((acc, service) => {
      const exist = this.#services[`${this.#name}:${service}`]
      if(exist) {
        acc[`${this.#name}:${service}`] = exist;
      }
      return acc;
    }, {})
  }
  getServicesAll() {
    return this.#services;
  }
}

module.exports = ResourceFactory;