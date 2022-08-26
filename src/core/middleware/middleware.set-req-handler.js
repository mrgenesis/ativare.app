'use strict';

function setContextToAuthMiddleware(context) {
  function setReqHandler() {    
    return function access(req, _, next) {
      req.getReqHandler = () => new context.Classes.ReqHandler(req);
      return next();
    }
  }
  setReqHandler.type = 'global';
  return setReqHandler;
}

module.exports = setContextToAuthMiddleware;
