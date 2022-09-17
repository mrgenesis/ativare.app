'use strict';

function execAccessAnalyzer(context) {
  function accessAnalyzer(src) {
    return function accessAnalyzer(req, _, next) {
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
  accessAnalyzer.type = 'allModules';
  accessAnalyzer.priority = 5;
  return accessAnalyzer;
}

module.exports = execAccessAnalyzer;
