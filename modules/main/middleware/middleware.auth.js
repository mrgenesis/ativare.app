'use strict';

function setContextToAuthMiddleware(context) {
  return function setDependencies(resource, CurrentModule){
    console.log('<<<< ...setDependencies >>>', resource);

    return function auth(req, res, next) {
      //resource.middlewareSet({ propertyName: 'auth', data: 'xxxxxx' })
      console.log('<<<< ...auth >>>');
      next();
    }
    
  }
}

module.exports = setContextToAuthMiddleware;
