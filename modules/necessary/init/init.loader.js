'use strict';

module.exports = function loader(app) {  
  const initModule = this;
  const tools = initModule.tools;
  return {
    async database(Module) {
      await Module.init(initModule.config.databases[Module.brand]);
      initModule.report('database', `${Module.brand} init successful.`); 
    },
    route(Module) {
      const module = new Module();
      const modelName = Object.getOwnPropertyDescriptor(module.model, 'name').value;

      initModule.models[modelName] = module.model;
      module.models = initModule.models;
      initModule.report('route', `Added model "${modelName}" function to models list.`); 

      
      module.tools = initModule.tools;
      initModule.report('route', `Added "${initModule
        .tools.constructor.name}" in ${module.constructor.name} Module.`);

        module.errorModuleFactory = module.tools.errorModuleFactory
        module.errorModuleFactory();
        delete module.errorModuleFactory;

      module.controller(app);
      initModule.report('route', `Load ${module.constructor.name}`); 
    },
    noDefault(Module, param) {
      Module.init(Module, param);
    },
    'undefined': function(m) {
      const isTools = Object.getOwnPropertyDescriptor(m, 'name').value === 'Tools'

      if(isTools) {
        return;
      }

      console.log('################ Warnnig... ################')
      console.log('\t>> Module without property type')
      console.log('\t\t>> Const: ', Object.getOwnPropertyDescriptor(m, 'name').value)
    }
  }
};

