'use strict';

module.exports = UserModel => async function getAll() {
  return UserModel.find({});
}
