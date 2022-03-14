'use strict';

// create a property "error" on Module.
// Atencion! This function must be connected to the Module
// before it can be executed.
module.exports = function setErrorModule(errorModule) {
  return function errorModuleFactory() {
    const Module = this;
    const name = Module.constructor.name;
    
    Module.errorGenerator = function errorGenerator(err) {
      err.name = name;
      return new errorModule.appError(err);
    }
    Module.errorFormat = function errorFormat(message, statusCode) {
      return { message, statusCode };
    }
  }
}
