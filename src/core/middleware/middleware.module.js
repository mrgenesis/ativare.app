'use strict';

class Middleware {
  #globalMiddlewares = {};
  #allModules = [];
  #moduleMiddlewares = {};
  #context;
  constructor(context) {;
    this.#context = context;
    this.loadMiddlewares();
  }
  loadMiddlewares() {
    const { Helper } = this.#context;
    const Types = Helper.types();
    const filesList = Helper.getFiles(__dirname).ignore([require('path').basename(__filename)]).list();
    filesList.forEach(file => {
      const middleware = require(`./${file}`)(this.#context);
      const loader = {
        global: () => this.#globalMiddlewares[middleware.name] = middleware,
        allModules: () => this.setAllModuleMiddleware(middleware),
        module: () => this.#moduleMiddlewares[middleware.name] = middleware
      };
      if(Types.isNotFunction(loader[middleware.type])) {
        throw `${middleware.name}: The "type" property of middleware is mandatory. And should be a string either "global", "allModules" or "module".`;
      }
      loader[middleware.type]();
    });
  }
  
  getGlobalMiddlewares() {
    return Object.values(this.#globalMiddlewares);
  }
  setAllModuleMiddleware(newMiddleware) {
    this.#allModules = this.setOrderedMiddleware(this.#allModules, newMiddleware);
  }
  setOrderedMiddleware(curruntList, newMiddleware) {
    if(this.#context.Helper.types().isUndefined(newMiddleware.priority) || newMiddleware.priority === 1) {
      newMiddleware.priority = 1;
      curruntList.unshift(newMiddleware);
      return curruntList;
    }
    curruntList.push(newMiddleware);
    return curruntList.sort((a, b) => a.priority - b.priority);
  }
  getModuleMiddleware(middlewareName) {
    return this.#moduleMiddlewares[middlewareName];
  }
  getAllModuleMiddlewares() {
    return this.#allModules;
  }
}

Middleware.priority = 9;
module.exports = Middleware;
