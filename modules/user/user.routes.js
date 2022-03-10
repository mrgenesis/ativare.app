'use strict';

function userRoutes(context) {

  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('', 'get', [], 'getAll'),
    new RouteFactory('register', 'post', [], 'createUser'),
    new RouteFactory('authenticate', 'post', [], 'auth'),
    new RouteFactory(':userCode', 'get', [], 'findOne'),
  ];
}

module.exports = userRoutes;
