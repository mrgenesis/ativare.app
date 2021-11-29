
'use strict';

function AppErrorModule() {
  this.appError = require('./app-error.app-error');
  this.errorModuleFactory = require('./app-error.error-module-factory');
}

  
module.exports = AppErrorModule;
