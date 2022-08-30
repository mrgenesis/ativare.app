'use strict';

function userRoutes(context) {

  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('authenticate', 'get', [], 'authenticate'),
    new RouteFactory('receive-aad-data', 'post', [], 'receiveAadData'),
  ];
}

module.exports = userRoutes;
