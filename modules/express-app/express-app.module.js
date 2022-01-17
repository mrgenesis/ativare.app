'use strict';

class ExpressApp {
  #app;
  #context;
  #express = require('express');
  constructor(context) {
    this.#context = context;
    this.#app = this.#express();
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: false }));
    this.setMiddlewares();
  }

  getApp() {
    return this.#app;
  }
  setMiddlewares() {
    const { Middleware } = this.#context;
    const auth = Middleware.getMiddleware({ middlewareName: 'auth' });
    this.#app.use(auth);
  }



}



ExpressApp.type = 'none';
module.exports = ExpressApp;