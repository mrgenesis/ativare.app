'use strict';

class Auth {
  #bcrypt = require('bcryptjs');
  #jwt = require('jsonwebtoken');
  #data = {};
  get user() {
    return this.#data.user;
  }
  generateToken({ param = {}, secret = process.env.JWT_SECRET } = {}) {
    console.log('param',param)
    return this.#jwt.sign(param.toJSON(), secret, { expiresIn: 86400 });
  }
  verifyToken({ token, secret = process.env.JWT_SECRET, ...options } = {}) {
    return this.#jwt.verify(token, secret, options);
  }
  hashPassword(password, salt) {
    return this.#bcrypt.hash(password, salt);
  }
  compare(str, hashedPass) {
    return this.#bcrypt.compare(str, hashedPass);
  }
  setErrorMessage(msg) {
    this.#data.message = msg;
  }
  setLoginStatus(bool = false) {
    this.#data.loginStatus = bool;
  }
  setUserData(userData) {
    this.#data.user = userData;
  }
  isLogin() {
    return this.#data.loginStatus;
  }
  getData(decoded) {
    console.log('getData running...', this.#data)
    console.log('decoded...', decoded)
    return this.#data;
  }
}

Auth.priority = 1;
module.exports = Auth;
