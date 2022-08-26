'use strict';

class RouterAux {
  #folderModule; #resource;
  constructor({ folderPath, context }) {
    this.#folderModule = folderPath;

    this.errorFactory = context.AppError.errorModuleFactory;
    this.errorFactory(); // set "errorGenerator" and "errorFormat" property

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
  getRouter(appConfig) { // TODO: appConfig deve constar apenas em context ou resource
    const controller = require(`${this.#folderModule}/${this.lowerCaseName}.controller`)
    const route = controller(this.#resource, appConfig);
    return route;
  }
  getResourcesAll() {
    return this.#resource;
  }
};

module.exports = RouterAux;

