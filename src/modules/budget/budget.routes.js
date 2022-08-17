'use strict';

module.exports = function budgetRoutes(context) {

  const { RouteFactory } = context.Classes;

  const routes = [
    new RouteFactory('create', 'post', ['create']),
    new RouteFactory('', 'get', ['find'], 'find'),
    new RouteFactory(':budgetId', 'get', ['findByCode'], 'findByCode'), // TODO: mudar :budgetId para :budgetCode
  ];

  return routes;
}