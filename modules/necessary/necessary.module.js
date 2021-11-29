'use strict';

function Tools() {
  const Util = require('./utils/utils.module');
  const Helper = require('./helper/helper.module');
  const AppError = require('./app-error/app-error.module');

  Util.call(this);
  Helper.call(this);
  AppError.call(this);
}

Tools.init = function init(app) {
  const tools = new Tools();  

  const InitModule = require('./init/init.module');
  const initModule = new InitModule(tools);

  initModule
    .configure()
    .make(app);
    
  return 0;
}

module.exports = Tools;
