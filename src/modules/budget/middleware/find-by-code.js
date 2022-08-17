'use strict';

function setContextToTtMiddleware(context) {
  return function findByCode(src) {
    
    return function findByCode(req, res, next) {
      console.log('Middleware findByCode running.....')
      // TODO: Este middleware deve definir as propriedades permitidas para o usuário visualizar
      req.userAuth.addData({ propertyName: 'allowedItems', value: ['basicBudgetView', 'privateDetails'] });
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
