'use strict';

function budgetMiddleware(context) {
  const { Helper } = context; 
  const budgetMiddleware = Helper
    .getFiles(`${__dirname}/middleware`)
    .requireAll()
    .runAll(context);

  return budgetMiddleware;
}

module.exports = budgetMiddleware;
