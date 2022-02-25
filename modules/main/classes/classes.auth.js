'use strict';

class Auth {
  #bcrypt = require('bcryptjs');
  #jwt = require('jsonwebtoken');
  #data = {};
  constructor() {
    this.#data.loginStatus = false;
  }
  get user() {
    return this.#data.user;
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
  getUserData() {
    return this.#data.user;
  }
  addData({ propertyName, value }) {
    this.#data[propertyName] = value;
  }
  getProperty(property) {
    return this.#data[property];
  }
}

Auth.priority = 1;
module.exports = Auth;
