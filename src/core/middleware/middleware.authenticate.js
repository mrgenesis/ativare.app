'use strict';

const passport = require('passport');

function execAuthenticate(context) {
  
  function authenticate(src) {
    return passport.authenticate('oauth-bearer', { session: false });
  }
  authenticate.type = 'allModules';
  return authenticate;
}

module.exports = execAuthenticate;
