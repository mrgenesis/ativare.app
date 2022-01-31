'use strict';

function setContextToTtMiddleware(context) {
  return function find(src) {
    
    return function find(req, res, next) {
      console.log('Middleware find running.....')
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
