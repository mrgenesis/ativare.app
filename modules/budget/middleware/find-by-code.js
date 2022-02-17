'use strict';

function setContextToTtMiddleware(context) {
  return function findByCode(src) {
    
    return function findByCode(req, res, next) {
      console.log('Middleware findByCode running.....')
      src.addData({ propertyName: 'allowedItems', value: ['customer','own','productsList', 'total', 'budgetFloors','privateDetails'] });
      next();
    }
  }
}
module.exports = setContextToTtMiddleware;
