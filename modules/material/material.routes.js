'use strict';

function materialRoutes(context) {
  const { RouteFactory } = context.Classes;
  const middlewaresInAll = ['accessAnalyzer'];

  return [
    new RouteFactory('new', 'post', [...middlewaresInAll, 'addMaterial'], 'create'),
    new RouteFactory('', 'get', [...middlewaresInAll], 'findAll'),
    new RouteFactory(':materialId', 'get', [...middlewaresInAll], 'findOne'),
    new RouteFactory('edit', 'put', [...middlewaresInAll], 'findByCodeAndUpdate'),
  ];
}

module.exports = materialRoutes;
