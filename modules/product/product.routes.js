'use strict';

function productRoute(context) {
  const { RouteFactory } = context.Classes;
  const DefaultMiddlewares = ['accessAnalyzer'];

  return [
    new RouteFactory('new', 'post', [...DefaultMiddlewares, 'create'], 'create'),
    new RouteFactory('', 'get', [...DefaultMiddlewares], 'find'),
    new RouteFactory('automation', 'get', [...DefaultMiddlewares], 'find'),
    new RouteFactory('edit', 'put', [...DefaultMiddlewares], 'update'),
    new RouteFactory(':productId', 'get', [...DefaultMiddlewares], 'findOne'),
  ];

}

module.exports = productRoute;
