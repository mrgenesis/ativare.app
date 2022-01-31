'use strict';

module.exports = function budgetRoutes(context) {

  const { RouteFactory } = context.Classes;
  const middlewaresInAll = ['accessAnalyzer'];

  const routes = [
    new RouteFactory('create', 'post', [...middlewaresInAll, 'create']),
    new RouteFactory('', 'get', [...middlewaresInAll, 'find'], 'find'),
    new RouteFactory(':budgetId', 'get', [...middlewaresInAll, 'findByCode'], 'findByCode'), // TODO: mudar :budgetId para :budgetCode
  ];

  return routes;
}