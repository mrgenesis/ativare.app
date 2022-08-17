
'use strict';

function setContext(RouteAux) {
  class User extends RouteAux {
    constructor(context) {
      super({ folderPath: __dirname, context });
    }
  }
  return User;
}

setContext.type = 'route';
module.exports = setContext;
