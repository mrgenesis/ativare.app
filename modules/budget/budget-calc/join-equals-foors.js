function joinEqualsFloors(products = '') {

  // Set a variable will storage the results
  let joinedProductsTheKeyAreItsFloor = {}
    , floorsNames = []
    , joinedProductsObj = [];

  if (products === '') {
    throw new Error('Don\'t sent a object');
  }

  // The "products" variable is the result of "findById" of mongoose
  for (let product of products) {

    if (!product.floor) {
      throw new Error('The product should have floor property');
    }
    if (joinedProductsTheKeyAreItsFloor[product.floor]) {
      joinedProductsTheKeyAreItsFloor[product.floor].push(product);
    }
    else {
      joinedProductsTheKeyAreItsFloor[product.floor] = [product];
    }
  }

  floorsNames = Object.keys(joinedProductsTheKeyAreItsFloor);
  joinedProductsObj = Object.values(joinedProductsTheKeyAreItsFloor);

  return {
    joinedProductsTheKeyAreItsFloor,
    floorsNames
  };

}

module.exports = joinEqualsFloors;