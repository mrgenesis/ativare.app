'use strict';

module.exports = function loader(app) {  
  const InitSystem = this;
  return {
    async database(Module) {
      await Module.init(InitSystem.config.databases[Module.brand]);
      InitSystem.report('database', `${Module.brand} init successful.`); 
    },
    route(Module) {
      const { AppError } = InitSystem.#context;
      const module = new Module(InitSystem.#context);
      const modelName = Object.getOwnPropertyDescriptor(module.model, 'name').value.replace(/model/i, '');

      InitSystem.context.models[modelName] = module.model;
      InitSystem.report('route', `Added model "${modelName}" function to models list.`); 
        
      
      module.errorModuleFactory = AppError.errorModuleFactory;
      module.errorModuleFactory();
        
      InitSystem.resourcesNames[module.constructor.name] = {};

      module.controller(app);
    },
    models(Module) {
      InitSystem.models = { ...InitSystem.models, ...(new Module()) };
    },
    noDefault(Module, param) {
      Module.init(Module, param);
    },
    none(m) {

    },
    'undefined': function(m) {

      console.log('################ Warnnig... ################')
      console.log('\t>> Module without property type')
    }
  }
};

