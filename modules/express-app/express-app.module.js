'use strict';

class ExpressApp {
  #express = require('express');
  constructor(context) {
    this.context = context;
    this.app = this.#express();
    this.app.use(this.#express.json());
    this.app.use(this.#express.urlencoded({ extended: false }));
  }

  getApp() {
    return this.app;
  }



}



ExpressApp.type = 'none';
module.exports = ExpressApp;