'use strict';

module.exports = function userService() {
  const UserModule = this;
  const servicePath = `${__dirname}/service`;
  
  const UserService = UserModule.tools.getFiles(servicePath)
    .requireAll()
    .runAll(UserModule.model());
  
  Object.setPrototypeOf(UserService, UserModule);
  return UserService;
};
