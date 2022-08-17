'use strict';

class Auth {
  #bcrypt = require('bcryptjs');
  #jwt = require('jsonwebtoken');
  #loginData = {};
  constructor() {
    this.#loginData.loginStatus = false;
  }
  get loginData() {
    return this.#loginData;
  }
  generateToken({ param = {}, secret = process.env.JWT_SECRET } = {}) {
    return this.#jwt.sign(param, secret, { expiresIn: 86400 });
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
    this.#loginData.message = msg;
  }
  setLoginStatus(bool = false) {
    this.#loginData.loginStatus = bool;
  }
  isLogin() {
    return this.#loginData.loginStatus;
  }
}

Auth.priority = 1;
module.exports = Auth;
