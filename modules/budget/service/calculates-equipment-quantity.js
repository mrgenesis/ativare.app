module.exports = (limit, charge, amountProduct) => {
  let getLimit = parseInt(limit, 10)
    , getCharge = parseInt(charge, 10);

  try {
    if (Number.isInteger(getLimit) && Number.isInteger(getCharge) && Number.isInteger(amountProduct)) {
      return amountProduct * (getCharge / getLimit);
    }
    else {
      return new Error('Todos os valores devem ser um inteiro.')
    }
  }
  catch (e) {
    console.error(e);
    return false;
  }
};