
'use strict';
const AppError = require('./app-error.app-error');
const errorFormat = require('./app-error.error-format');// TODO: deprecated
const CreatorError = require('./app-error.creator-error');

class ErrorHandler {
  constructor() {
    this.appError = require('./app-error.app-error'); // TODO: deprecated
  }
  createError(err, statusCode) {
    return {
      message: err.message,
      statusCode: statusCode,
      stack: err.stack,
    }
  }
  static errorFormat = errorFormat;

  // create a property "error" on Module.
  // Atencion! This function must be connected to the Module
  // before it can be executed.
  static errorModuleFactory() {
    const ResourceModule = this;
    const name = ResourceModule.constructor.name;
    ResourceModule.errorGenerator = function errorGenerator(err) {
      err.name = name;
      return new AppError(err);
    }
    ResourceModule.errorFormat = errorFormat;// TODO: deprecated
  }
  static CreatorError = CreatorError;
  static formatter(err) {
    if(err.isAppError) {
      return err;
    }
    return new AppError(err);
  }
}

ErrorHandler.priority = 1;
module.exports = () => ErrorHandler;
