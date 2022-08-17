'use strict';

module.exports = function materialService(context) {
  const { Helper } = context;

  const Service = Helper.getFiles(`${__dirname}/service`)
    .requireAll()
    .runAll(context);

  return Service;
}