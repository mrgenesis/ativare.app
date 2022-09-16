'use strict';

function setContextToTtMiddleware(context) {
  return function findByCode(src) {
    return function findByCode(req, _, next) {
      try {
        if(req.user.isGranted(src, context.groups)) {
          return next();
        }
        throw new context.AppError.ErrorCreator('O usuário não possui acesso a esse recurso. Fale com o administrador.', 403);
      } catch (err) {
        src.error(next, err);
      }
    }
  }
}
module.exports = setContextToTtMiddleware;
