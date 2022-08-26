'use strict';


function setContextToAuthMiddleware(context) {
  function access() {    
    return async function access(req, _, next) {
      const authenticate = '/user/authenticate';
      const getAadData = '/user/get-aad-data';
      const isAllowed = (req.path === authenticate) || (req.path === getAadData);
      if(req.session.isAuthenticated || isAllowed) {
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
