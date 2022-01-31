'use strict';

module.exports = function userService(context) {
  const { Helper } = context;
  
  return Helper.getFiles(`${__dirname}/service`)
    .requireAll()
    .runAll(context);
};
