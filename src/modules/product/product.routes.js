'use strict';

function productRoute(context) {
  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('new', 'post', ['create'], 'create'),
    new RouteFactory('', 'get', ['find'], 'find'),
    new RouteFactory('automation', 'get', ['find'], 'find'),
    new RouteFactory('edit', 'put', ['update'], 'update'),
    new RouteFactory(':productId', 'get', ['findOne'], 'findOne'),
  ];

}

module.exports = productRoute;
