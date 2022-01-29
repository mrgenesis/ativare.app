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
    this.setServiceInRoute(route);
    this.setMiddlewareInRoute(route);
    this.generateApplicationResourceName(route);
    debugger;
    this.#resource[route.srcName] = route;
  }

  setServiceInRoute(route = {}) {
    route.setService(this.#services[route.serviceName]);
  }
  setMiddlewareInRoute(route = {}) {
    const GlobalMiddlewares = this.#context.Middleware;
    return route.middlewaresNamesList.map(name => {
      if (GlobalMiddlewares.getModuleMiddleware(name)) {
        route.setMiddleware(GlobalMiddlewares.getModuleMiddleware(name));
        return;
      }
      if (this.#middleware[name]) {
        route.setMiddleware(this.#middleware[name]);
      }
    });    
  }
  generateApplicationResourceName(route) {    
    const arn = `${route.name}_${route.serviceName}@${this.#module.name}_${route.type}`;
    route.setApplicationResourceName(arn);
  }
}

module.exports = ResourceManager;
