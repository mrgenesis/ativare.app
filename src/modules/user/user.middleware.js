module.exports = function userMiddleware() {
  const jwt = require('jsonwebtoken');
  const authConfig = process.env.AUTH_CONFIG;

  function addUser(_, __, next) {
    next();
  }
  function authUser(_, __, next) {
    next();
  }
  return {
    addUser,
    authUser
  };
};
