'use strict';

function userRoutes(context) {

  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('authenticate', 'post', [], 'auth')
  ];
}

module.exports = userRoutes;
