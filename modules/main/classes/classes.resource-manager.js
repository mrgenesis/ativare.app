'use strict';

class ResourceManager {
  #context; #services; #middleware; #folderPath; #module;
  #resource = {};  
  constructor({ module, context, folderPath }){
    this.#module = module;
    this.#context = context;
    this.#folderPath = folderPath;
    
    const model = this.requireItem(module.lowerCaseName, 'model');
    this.#context.model.setModel(module.lowerCaseName, model);
    
    const service = this.requireItem(module.lowerCaseName, 'service');
    this.setService(service);

    const middleware = this.requireItem(module.lowerCaseName, 'middleware');
    this.setMiddleware(middleware);
    
    const routes = this.requireItem(module.lowerCaseName, 'routes');
    this.setResources(routes);

  }
  requireItem(moduleName, name) {
    return require(`${this.#folderPath}/${moduleName}.${name}`)(this.#context);
  }
  setService(service) {
    this.#services = service;
  }
  setMiddleware(middleware) {
    this.#middleware = middleware;
  }

  getResourcesAll() {
    return this.#resource;
  }
  setResources(routes) {
    routes.forEach(route => {
      this.setResource(route);
    });
  }
  setResource(route) { 
    route.setModuleLowerCaseName(this.#module.lowerCaseName);
    route.setService(this.getService(route.serviceName));
    route.middlewaresNamesList.forEach(middlewareName => {
      route.setMiddleware(this.getMiddleware(middlewareName));
    });
    this.generateApplicationResourceName(route);
    
    this.#resource[route.srcName] = route;
  }

  getService(serviceName) {
    return this.#services[serviceName];
  }
  getMiddleware(middlewareName) {
    const GlobalMiddlewares = this.#context.Middleware;
    let middleware = GlobalMiddlewares.getModuleMiddleware(middlewareName);
    if (this.#context.Helper.types().isFunction(middleware)) {
      return middleware;
    }

    middleware = this.#middleware[middlewareName];
    if (this.#context.Helper.types().isNotFunction(middleware)) {
      throw `Middleware "${middlewareName}" not found`;
    }
    return middleware;    
  }
  generateApplicationResourceName(route) {    
    const arn = `${route.name}_${route.serviceName}@${this.#module.name}_${route.type}`;
    route.setApplicationResourceName(arn);
  }
}

module.exports = ResourceManager;
