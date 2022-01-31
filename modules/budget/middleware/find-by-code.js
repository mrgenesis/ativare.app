'use strict';

function setContextToTtMiddleware(context) {
  return function findByCode(src) {
    
    return function findByCode(req, res, next) {
      console.log('Middleware findByCode running.....')
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
