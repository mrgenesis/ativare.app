'use strict';

function execAccessAnalyzer(context) {
  function accessAnalyzer(src) {console.log('execAccessAnalyzer: ', src.endpoint)
    return function accessAnalyzer(req, _, next) {
      try {

        if (context.Helper.types().isFalse(req.userAuth.isLogin())) {
          throw src.createError(`É necessário estar logado para acessar esse conteúdo - ${req.userAuth.loginData.message}`, 401);
        }
        
        req.userAuth.src = src;
        req.userAuth.analyzeAccess();       

        return next();

      } catch(err) {
        src.error(next, err);
      }
    }
  }
  accessAnalyzer.type = 'allModules';
  return accessAnalyzer;
}

module.exports = execAccessAnalyzer;
