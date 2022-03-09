'use strict';

class Middleware {
  #globalMiddlewares = {};
  #allModules = [];
  #moduleMiddlewares = {};
  #context;
  constructor(context) {
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
        allModules: () => this.#allModules.push(middleware),
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

  getModuleMiddleware(middlewareName) {
    return this.#moduleMiddlewares[middlewareName];
  }
  getAllModuleMiddlewares() {
    return this.#allModules;
  }
}

Middleware.priority = 9;
module.exports = Middleware;
