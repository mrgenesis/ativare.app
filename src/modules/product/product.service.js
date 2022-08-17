'use strict';

module.exports = function productService(context) {
  const { Helper } = context;

  return Helper.getFiles(`${__dirname}/service`)
    .requireAll()
    .runAll(context);  
}
