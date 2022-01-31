'use strict';

function setContextToTtMiddleware(context) {
  return function create(src) {
    
    return function create(req, res, next) {
      console.log('Middleware create running.....')
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
