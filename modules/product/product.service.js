'use strict';

module.exports = function productService() {
  const ProductModule = this;
  const ProductModel = ProductModule.model();
  const Tools = ProductModule.tools;
  const servicePath = `${__dirname}/service`;

  const funcs = Tools.getFiles(servicePath)
    .requireAll()
    .runAll(ProductModel);

  Object.setPrototypeOf(funcs, ProductModule);
  return funcs;
  
}
