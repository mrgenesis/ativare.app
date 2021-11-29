'use strict';

class InitModule {
  #report = {
    count: 0
  };
  constructor(tools) {
    this.report('initClass', 'The class "InitModule"  has been intenced.');
    this.tools = tools;
    this.models = {
      counter: tools.mongooseCounterModel
    };
    this.requireModules = require('./init.require-modules');
    this.loader = require('./init.loader');    
  }
  
  configure() { 
    this.setLocalEnvironment();
    const config = require('./init.config');
    const ENVIRONMENT = process.env.NODE_ENV;
    this.config = config(ENVIRONMENT);
    this.report('configure', 'Getting config file for the approperty environment'); 
    return this;
  }
  setLocalEnvironment() {
    const Types = this.tools.types();    
    if(Types.isUndefined(process.env.NODE_ENV)) {
      require('dotenv').config({ path: __dirname + '/.env.development'});
    } else {
      this.report('setLocalEnvironment', 'Environment configured in prodution');      
    }
  }
  make(app) {
    this.requireModules(this.config.modulesPath);

    this.dataModules.modules.map(async Module => {
      return this.loader(app)[Module.type](Module);
    });
  }
  report(property, msg) {
    this.#report[++this.#report.count] = {
      stepName: property,
      msg
    }
  }
  getReport() {
    return this.#report;
  }
}

module.exports = InitModule;
