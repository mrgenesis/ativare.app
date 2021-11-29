'use strict';

module.exports = function materialMiddleware() {
  const MaterialMiddlewares = {};

  MaterialMiddlewares.addMaterial = function addMaterial(req, res, next) {
    next();
  }

  return MaterialMiddlewares;
}