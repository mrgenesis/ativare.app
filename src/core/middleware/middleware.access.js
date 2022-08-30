'use strict';


function setContextToAuthMiddleware(context) {
  function access() {    
    return async function access(req, _, next) {
      const allowededs = ['/user/authenticate', '/user/receive-aad-data'];
      if(req.session.isAuthenticated || allowededs.some(path => path === req.path)) {
        return next();
      }
      try {
        const err = new context.AppError.CreatorError('O usuário não está autenticado', 403);
        err.setArn('accessMiddleware@Global');
        throw err;
      } catch (err) {
        next(err);
      }
    }
  }
  access.type = 'global';
  return access;
}

module.exports = setContextToAuthMiddleware;
