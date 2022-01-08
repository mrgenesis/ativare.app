'use strict';

// create a property "error" on Module.
// Atencion! This function must be connected to the Module
// before it can be executed.
module.exports = function errorModuleFactory() {

  const Module = this;

  const name = Module.constructor.name; 
  
  Module.error = {};
 
  Module.error.create = function create(message, statusCode) {
    return new Module.tools.appError({ name, message, statusCode });
  }
  Module.error.next = function next(err) {
    return err.isAppError ? err : this.internalError({ internalError: err });
  }
  Module.error.internalError = function internalError({ internalError, name }) {
    const error = new Module.tools.appError({ name });
    error.internalError = internalError;
    return error;
  }
}
