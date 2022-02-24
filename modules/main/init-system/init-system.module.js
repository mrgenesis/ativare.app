'use strict';

class InitSystem {
  #AppModule;
  #context = {};
  #modulesRequired = [];
  constructor(context) { 
    this.#context = context;
    this.applicationResources = {};
    this.#context.model = {};
    this.#context.middleware = {};
  }
  getApp() {
    return this.#AppModule.getApp();
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
    const appFolderPath = `${this.config.modulesFolder}/${this.config.appFolderName}/${this.config.appFolderName}.module.js`;
    const AppModule = require(appFolderPath);
    this.#AppModule = new AppModule(this.#context);
  }
  async make() {
    this.requireModules(this.config.modulesFolder);

    await this.loadDatabase();
    this.loadModels();
    this.loadRoutes();
    this.#AppModule.addErrorHandler();

  }
  loadModels() {
    this.#modulesRequired.forEach(m => {
      const M = { ...m };
      if (M.type === 'model') {
        this.#context.model = new m();
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
  loadDatabase() {
    const databaseModule = this.#modulesRequired.filter(Module => Module.type === 'database')[0];
    return databaseModule.init(this.config.databases[databaseModule.brand]);
  }
  loadRoutes() {
    const InitSystem = this;
    for (const getModule of this.#modulesRequired) {
      if(getModule.type === 'route') {
        try {
          var Module = getModule(InitSystem.#context.Classes.RouterAux);
          const { AppError } = InitSystem.#context;
          const module = new Module(InitSystem.#context);    
          
          InitSystem.#AppModule.setRoute(module);
          InitSystem.#AppModule.setApplicationResources(module);

        } catch (e) {
          const OthersUtils = this.#context.Helper.othersUtils();
          const moduleName = Object.getOwnPropertyDescriptor(Module || getModule, 'name').value;
          // TODO: tratar o erro
          // Exemplo:
          // this.error.internalError(e);
          OthersUtils.log(`InitSystem-loadRoutes-${moduleName}`, `O carregamento do módulo <${moduleName}> falhou.`);
          OthersUtils.log(`InitSystem-loadRoutes-${moduleName}`, 'Error in loadRoutes:', [e]);
        }
      }
      
    }
  }
  setApplicationResources(module) {
    this.applicationResources[module.name] = module.resources();
  }
}

InitSystem.priority = 10;
module.exports = InitSystem;
