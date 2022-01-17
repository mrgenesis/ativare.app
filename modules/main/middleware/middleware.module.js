'use strict';

class Middleware {
  #middlewares = {};
  constructor(context) {
    const { Helper } = context;
    debugger;
    this.#middlewares = Helper
      .getFiles(__dirname)
      .ignore([require('path').basename(__filename)])
      .requireAll()
      .runAll(context);
  }

  getMiddleware({ middlewareName, resource, currenteModule }) {
    return this.#middlewares[middlewareName](resource, currenteModule);
  }
  getMiddlewares({ middlewares, resource, currenteModule }) {
    return middlewares.map(middleware => {
      if(this.#middlewares[middleware]) {
        return this.#middlewares[middleware](resource, currenteModule);
      }
    });
  }
}

Middleware.priority = 9;
module.exports = Middleware;
