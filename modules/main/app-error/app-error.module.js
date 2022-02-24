
'use strict';

class AppError {
  constructor(context) {
    this.appError = require('./app-error.app-error');
    this.errorModuleFactory = require('./app-error.error-module-factory')(this);  
    this.unknowledge = require('./app-error.unknowledge');
  }
}

AppError.priority = 1;
module.exports = AppError;
