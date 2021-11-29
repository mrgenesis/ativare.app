'use strict';

function findOne(UserModel) {
  const UserModule = this;

  return async function findOne(obj) {
    return UserModel.findOne(obj)
  }
}

module.exports = findOne;