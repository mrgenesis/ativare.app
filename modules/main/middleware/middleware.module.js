'use strict';

class Middleware {
  #globalMiddlewares = {};
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
        module: () => this.#moduleMiddlewares[middleware.name] = middleware
      };
      if(Types.isNotFunction(loader[middleware.type])) {
        throw 'The property "type" is mandatory. And should be a string their "global" or "module".';
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
}

Middleware.priority = 9;
module.exports = Middleware;
