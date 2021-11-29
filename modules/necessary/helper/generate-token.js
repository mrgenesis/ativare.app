'use strict';

const jwt = require('jsonwebtoken');

module.exports = function generateToken({ param = {}, secret = process.env.SECRET, expiresIn = 86400 } = {}) {

  return jwt.sign(param, secret, { expiresIn });

};
