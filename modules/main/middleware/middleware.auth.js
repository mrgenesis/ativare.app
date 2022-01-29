'use strict';

function setContextToAuthMiddleware(context) {
  function auth(req, res, next) {
    console.log('<<<< ...auth >>>');
    next();
  }
  auth.type = 'global';
  return auth;
}

module.exports = setContextToAuthMiddleware;
