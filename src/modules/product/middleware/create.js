'use strict';

function setContext(context) {
  return function create(src) {
    return function create(req, _, next) {
      try {
        if (req.user.isGranted(src, context.groups)) {
          return next();
        }
        throw new context.AppError.ErrorCreator('O usuário não possui acesso a esse recurso. Fale com o administrador.', 403);
      } catch(err) {
        src.error(next, err);
      }
    }
  }
}

module.exports = setContext;