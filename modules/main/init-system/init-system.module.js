'use strict';

class InitSystem {
  #context = {};
  #report = {
    count: 0
  };
  #app = {};
  #modulesRequired = [];
  constructor(context) { 
    this.#context = context;
    this.applicationResources = {};
    this.#context.models = {};
  }
  getApp() {
    return this.#app;
  }
  
  configure(appConfigPath) { 
    this.getAppConfig = require(appConfigPath);
    this.ifIsLocalhostGetDotEnvInRootProject();
    this.config = this.getAppConfig(this.#context);
    this.createApp();
    return this;
  }
  ifIsLocalhostGetDotEnvInRootProject() {
    if(this.isDevEnvironment(this.getAppConfig)) { 
      const r = require('dotenv').config({ path: this.dotEnvDevPath });
    } 
  }
  isDevEnvironment(){
    // if NODE_ENV is undefined and .env.development is set on root project
    // the app set localhost mode
    const NODE_ENV = process.env.NODE_ENV
        , Types = this.#context.Helper.types()
        , { existsSync } = require('fs');
    this.dotEnvDevPath = this.getAppConfig.getDotEnvDev();
    return Types.isUndefined(NODE_ENV) && existsSync(this.dotEnvDevPath);
  }
  createApp() {
    const appFolderPath = `${this.config.modulesFolder}/express-app/express-app.module.js`;
    const ExpressApp = require(appFolderPath);
    const expressApp = new ExpressApp(this.#context);
    this.#app = expressApp.getApp();
  }
  make() {
    this.requireModules(this.config.modulesFolder);

    this.loadModels();
    this.#modulesRequired.map(Module => {
      try {
        const Types = this.#context.Helper.types();
        this.#app.set('applicationResources', this.applicationResources);
        const M = { ...Module }; // TODO: Estudar o motivo que essa linha evita circular dependência
        if(Types.isFunction(this.loader(this.#app)[M.type])) {
          this.loader(this.#app)[M.type](Module);
        } else {
          console.warn(`${__filename} #Warnnig: Não há função para carregar o módulo <${Object.getOwnPropertyDescriptor(Module, 'name').value}>. Type: ${M.type}.`);
        }
      } catch (e) {
        // TODO: tratar o erro
        // Exemplo:
        // this.error.internalError(e);
        console.error(`${__filename} #Error: O carregamento do módulo <${Object.getOwnPropertyDescriptor(Module, 'name').value}> falhou.`);
      }
    });

  }
  loadModels() {
    this.#modulesRequired.forEach(m => {
      const M = { ...m };
      if (M.type === 'models') {
        this.#context.models = new m();
      }
    });
  }
  requireModules(folder) {
    const folders = this.#context
      .Helper.getFolders(folder)
      .ignore(['main', 'necessary']);
    folders.namesList().map(name => {
      const Module = require(`${folder}/${name}/${name}.module`);
      this.#modulesRequired.push(Module);
    });
  }
  loader(app){
    const InitSystem = this;
    return {
      async database(Module) {
        return Module.init(InitSystem.config.databases[Module.brand]);
      },
      route(Module) {
        const { AppError } = InitSystem.#context;
        const module = new Module(InitSystem.#context);
        const modelName = Object.getOwnPropertyDescriptor(module.model, 'name').value.replace(/model/i, '');

        InitSystem.#context.models[modelName] = module.model;
          
        
        module.errorModuleFactory = AppError.errorModuleFactory;
        module.errorModuleFactory();
        
        module.controller(app);
      },
      noDefault(Module, param) {
        Module.init(Module, param);
      },
      none(m) {

      },
      // 'undefined': function(m) {

      //   console.log('################ Warnnig... ################')
      //   console.log('\t>> Module without property type')
      // }
    }
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

InitSystem.priority = 10;
module.exports = InitSystem;
