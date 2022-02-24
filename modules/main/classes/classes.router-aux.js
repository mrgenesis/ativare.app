'use strict';

class RouterAux {
  #folderModule; #resource;
  constructor({ folderPath, context }) {
    this.#folderModule = folderPath;

    this.errorFactory = context.AppError.errorModuleFactory;
    this.errorFactory();

    const { ResourceManager } = context.Classes;
    const Manager = new ResourceManager({ module: this, folderPath, context });    
    this.setResource(Manager.getResourcesAll());
  }
  get name() {
    return this.constructor.name;
  }
  get lowerCaseName() {
    return this.name.toLowerCase();
  }
  get entry() {
    return `/${this.lowerCaseName}`;
  }
  setResource(resource) {
    this.#resource = resource;
  }
  getRouter() {
    return require(`${this.#folderModule}/${this.name}.controller`)(this.#resource);
  }
  getResourcesAll() {
    return this.#resource;
  }
};

module.exports = RouterAux;

