'use strict';

module.exports = function materialMiddleware(context) {
  const { Helper } = context;

  const Middlewares = Helper.getFiles(`${__dirname}/middleware`)
    .requireAll()
    .runAll(context);

  return Middlewares;
}