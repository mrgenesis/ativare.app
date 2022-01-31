'use strict';


function setDependencie(RouterAux) {

  class Budget extends RouterAux {
    constructor(context) {
      super({ folderPath: __dirname, context });
    }
  }
  
  return Budget;
}

setDependencie.type = 'route';
module.exports = setDependencie;
