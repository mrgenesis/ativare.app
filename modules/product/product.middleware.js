'use strict';

module.exports = function productMiddleware(context) {
  const { Helper } = context;

  return Helper.getFiles(`${__dirname}/middleware`)
    .requireAll()
    .runAll(context);
}
