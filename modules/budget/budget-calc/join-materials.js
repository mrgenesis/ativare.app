const calculatesEquipamentQuantity = require('./calculates-equipment-quantity');

function joinMaterials(joinedProducts, materialsList) {
  let joinedMaterials = {};
  let amount = 0;

  for (let product of joinedProducts) {
    product.materials.map(material => {
      let getMaterialOfList = materialsList.find(materialOfList => parseInt(material.code, 10) === parseInt(materialOfList.code, 10))
      amount = product.amount;
      
      if (joinedMaterials[material._id]) {
        joinedMaterials[material._id].totalAmountInProducts += amount;
        joinedMaterials[material._id].amountCalc += calculatesEquipamentQuantity(getMaterialOfList.limit, material.charge, amount);
      }
      else {
        joinedMaterials[material._id] = {
          _id: material._id,
          totalAmountInProducts: amount,
          amountCalc: calculatesEquipamentQuantity(getMaterialOfList.limit, material.charge, amount),
          limit: getMaterialOfList.limit
        };
      }

    });

  }
  return joinedMaterials;
}

module.exports = joinMaterials;