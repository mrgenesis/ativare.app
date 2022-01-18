'use strict';

class ResourceManager {
  #name = '';
  #context;
  #resources = {};
  #services = {};
  #entry = '';
  constructor(name, context){
    this.#name = name.replace('Module', '');
    this.#context = context;
    this.#entry = `/${this.#name.toLowerCase()}`;
  }
  setContext(context) {
    this.#context = context;
  }

  getName() {
    return this.#name;
  }
  getEntry() {
    return this.#entry;
  }
  getResource(localName) {
    return this.#resources[localName];
  }
  getResourcesAll() {
    return { ...this.#resources };
  }
  setResource({ ...props }) { 
    const service = this.getService(`${props.service || props.name}@${this.#name}_${props.type.toLowerCase()}`);
    const { ResourceFactory } = this.#context.Classes;
    const resource = new ResourceFactory({ ...props, service, moduleName: this.#name });
    this.#resources[resource.getLocalName()] = resource;
  }
  setResources(arr) {
    arr.forEach(srcConfig => {
      this.setResource(srcConfig);
    });
  }
  setServices(arr) {
    arr.forEach(service => {
      this.setService(service);
    });
  }
  setService({ ...props }) {
    this.#services[this.generateServiceName(props)] = {
      ...props
    }
  }
  generateServiceName(props) {
    return `${props.name}@${this.#name}_${props.type}`;
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

module.exports = ResourceManager;
