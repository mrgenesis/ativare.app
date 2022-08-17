'usre strict';

function setDependence(RouteAux) {
  class Product extends RouteAux {
    constructor(context) {
      super({ folderPath: __dirname, context });
    }
  }
  return Product;
}

setDependence.type = 'route';
module.exports = setDependence;
