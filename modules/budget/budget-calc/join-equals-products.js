function joinEqualsProducts(products = '') {
  let joinedProducts = {}

    // Set a variable will storage the results
    , joinedProductsTheKeyAreItsIds = {}
    , joinedProductsId = []
    , joinedProductsObj = [];

  if (products === '')
    throw new Error('Don\'t sent a object');

  // The "products" variable is the result of "findById" of mongoose
  for (let product of products) {
    if (!product._id)
      throw new Error('Product of list without property _id');

    if (!product.amount)
      throw new Error('Product of list without property amount');

    if (!Number.isInteger(product.amount)) {
      throw new Error('The property "amount" should be number');
    }

    if (joinedProducts[product._id]) {
      joinedProducts[product._id].amount += product.amount;
    }
    else {
      joinedProducts[product._id] = { ...product };
    }
  }

  joinedProductsTheKeyAreItsIds = joinedProducts;
  joinedProductsId = Object.keys(joinedProducts);
  joinedProductsObj = Object.values(joinedProducts);

  return { joinedProductsTheKeyAreItsIds, joinedProductsId, joinedProductsObj };
}

module.exports = joinEqualsProducts;