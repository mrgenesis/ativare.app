'use strict';

class InitModule {
  #report = {
    count: 0
  };
  constructor({ tools, appConfig }) {
    this.report('initClass', 'The class "InitModule"  has been intenced.');
    this.tools = tools;
    this.appConfig = appConfig;
    this.models = {
      counter: tools.mongooseCounterModel
    };
    this.requireModules = require('./init.require-modules');
    this.loader = require('./init.loader');    
  }
  
  configure() { 
    this.ifIsLocalhostGetDotEnvInRootProject();
    this.config = this.appConfig();
    this.report('configure', 'Getting config file for the approperty environment'); 
    return this;
  }
  ifIsLocalhostGetDotEnvInRootProject() {
    if(this.isDevEnvironment()) { 
      const r = require('dotenv').config({ path: this.appConfig.getDotEnvDev() });
    } 
  }
  isDevEnvironment(){
    // if NODE_ENV is undefined and .env.development is set on root project
    // the app set localhost mode
    const NODE_ENV = process.env.NODE_ENV
        , Types = this.tools.types()
        , dotEnvDevPath = this.appConfig.getDotEnvDev()
        , { existsSync } = require('fs');
    return Types.isUndefined(NODE_ENV) && existsSync(dotEnvDevPath);
  }
  make(app) {
    this.requireModules(this.config.modulesFolder);

    this.dataModules.modules.map(Module => {
      this.loader(app)[Module.type](Module);
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
