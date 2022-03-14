
'use strict';

class AppError {
  constructor(context) {
    this.appError = require('./app-error.app-error');
    this.errorModuleFactory = require('./app-error.error-module-factory')(this);
  }
  createError(err, statusCode) {
    return {
      message: err.message,
      statusCode: statusCode,
      stack: err.stack,
    }
  }
}

AppError.priority = 1;
module.exports = AppError;
