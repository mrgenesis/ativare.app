'use strict';

module.exports = (UserModel) => {
  return async function createUser(newUser) {
    return UserModel.create(newUser);
  }
};
