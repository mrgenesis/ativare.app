'use strict';

function productRoute(context) {
  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('new', 'post', ['create'], 'create'),
    new RouteFactory('', 'get', [], 'find'),
    new RouteFactory('automation', 'get', [], 'find'),
    new RouteFactory('edit', 'put', [], 'update'),
    new RouteFactory(':productId', 'get', [], 'findOne'),
  ];

}

module.exports = productRoute;
