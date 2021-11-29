const joinEqualsFloors = require('./join-equals-foors');
const joinEqualsProducts = require('./join-equals-products');
const joinMaterials = require('./join-materials');

function budgetCalc(products = '', materialsList) {

  // join per floors
  let joinPerFloors = {}

    // join equals products per floor
    , joinEqualsProductsPerFloor = {}

    // join equals materials per floor
    , joinEqualsMaterials = {}

    // Total per material
    , subTotal = 0

    // Totala value of budget
    , total = 0

    // Material list of budget joined per floor
    , materialListOfBudget

    // Find material of list of DB
    , findMaterialOfList

    // Private values avaliable only to admin users
    , materialsPrivateDetails = []

    // Only floors of budget
    , budgetFloors = [];


  // Join products the same as floor. 
  // {floor1: {prod, prod}, floor2: {prod, prod}}
  joinPerFloors = joinEqualsFloors(products);

  // Join equals products.
  // {floor1: {2x prod}, floor2: {2x prod}}
  joinPerFloors.floorsNames.map((floor) => {
    joinEqualsProductsPerFloor[floor] = [...joinEqualsProducts(joinPerFloors.joinedProductsTheKeyAreItsFloor[floor]).joinedProductsObj];
  });

  for (let floor in joinEqualsProductsPerFloor) {
    joinEqualsMaterials[floor] = joinMaterials(joinEqualsProductsPerFloor[floor], materialsList);

    materialListOfBudget = Object.values(joinEqualsMaterials[floor]);

    materialListOfBudget.map((material, idx) => {
      findMaterialOfList = materialsList.find(item => item._id == material._id);
      materialListOfBudget[idx] = { floor: floor, ...material, _id: findMaterialOfList._id, ms: findMaterialOfList.ms, name: findMaterialOfList.name, unitPrice: findMaterialOfList.unitPrice };
      materialListOfBudget[idx].roundedAmount = Math.ceil(material.amountCalc);
      materialListOfBudget[idx].subTotal = materialListOfBudget[idx].roundedAmount * materialListOfBudget[idx].unitPrice;
      total += materialListOfBudget[idx].subTotal;
      materialsPrivateDetails.push(materialListOfBudget[idx]);
    });

  }
  budgetFloors = Object.keys(joinPerFloors.joinedProductsTheKeyAreItsFloor);
  return { total, materialsPrivateDetails, budgetFloors };

}
module.exports = budgetCalc;