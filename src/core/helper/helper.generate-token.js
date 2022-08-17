'use strict';

const jwt = require('jsonwebtoken');

function generateToken({ param = {}, secret = process.env.SECRET, expiresIn = 86400 } = {}) {

  return jwt.sign(param, secret, { expiresIn });

};
generateToken.priority = 1;
module.exports = generateToken;
