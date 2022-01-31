'use strict';

class ExpressApp {
  #app;
  #context;
  #express = require('express');
  constructor(context) {
    this.#context = context;
    this.#app = this.#express();
    this.#app.set('applicationResources', {});
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: false }));
    this.setMiddlewares();
    this.activeCorsIfIsDev();
  }

  getApp() {
    return this.#app;
  }
  setMiddlewares() {
    const { Middleware } = this.#context;
    const globalMiddlewaresList = Middleware.getGlobalMiddlewares();
    this.#app.use(globalMiddlewaresList);
  }
  setRoute(module) {
    this.#app.use(module.entry, module.getRouter());
  }
  setApplicationResources(module) {
    this.#app.get('applicationResources')[module.name] = module.getResourcesAll();
  }
  getApplicationResources(name) {
    return this.#app.get('applicationResources')[name];
  }
  activeCorsIfIsDev() {
    if(process.env.NODE_ENV === 'development') {
      const cors = require('cors');
      this.#app.use(cors());
    }
  }



}



ExpressApp.type = 'none';
module.exports = ExpressApp;