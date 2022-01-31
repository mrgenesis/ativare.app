'use strict';

function setDependencie(RouterAux) {

  class Material extends RouterAux {
    constructor(context) {
      super({ folderPath: __dirname, context });
    }
  }
  
  return Material;
}

setDependencie.type = 'route';
module.exports = setDependencie;
