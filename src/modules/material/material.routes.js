'use strict';

function materialRoutes(context) {
  const { RouteFactory } = context.Classes;

  return [
    new RouteFactory('new', 'post', [], 'create'),
    new RouteFactory('', 'get', [], 'findAll'),
    new RouteFactory(':materialId', 'get', [], 'findOne'),
    new RouteFactory('edit', 'put', [], 'findByCodeAndUpdate'),
  ];
}

module.exports = materialRoutes;
