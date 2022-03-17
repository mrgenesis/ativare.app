'use strict';

function setContextToAuthMiddleware(context) {
  const { UserAuth } = context.ExtendedClass;

  function authVerify(req, _, next) {
    const authHeader = req.headers.authorization;
    req.userAuth = new UserAuth(context);
    
    if (!authHeader) {
      req.userAuth.setErrorMessage('No token provided.');
      return next();
    }

    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
      req.userAuth.setErrorMessage('Token error.');
      return next();
    }
    
    const [ schema, token ] =  parts;
    if(!/^Bearer$/i.test(schema)) {
      req.userAuth.setErrorMessage('Malformatted token.');
      return next();
    }
        
    try {
      const decoded = req.userAuth.verifyToken({ token });
      req.userAuth.user = decoded;
      return next();
    } catch (err) {
      req.userAuth.setErrorMessage('Invalid token.');
      return next();    
    }
          
  }
  authVerify.type = 'global';
  return authVerify;
}

module.exports = setContextToAuthMiddleware;
