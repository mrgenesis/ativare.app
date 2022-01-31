'use strict';

function userRoutes(context) {

  const { RouteFactory } = context.Classes;
  const DefaultMiddlewares = ['accessAnalyzer'];

  return [
    new RouteFactory('', 'get', [...DefaultMiddlewares], 'getAll'),
    new RouteFactory('register', 'post', [...DefaultMiddlewares], 'createUser'),
    new RouteFactory('authenticate', 'post', [...DefaultMiddlewares], 'auth'),
    new RouteFactory(':userCode', 'get', [...DefaultMiddlewares], 'findOne'),
  ];
}

module.exports = userRoutes;
