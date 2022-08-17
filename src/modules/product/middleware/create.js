'use strict';

function setContext(context) {
  return function create(src) {
    return function create(req, res, next) {
      next();
    }
  }
}

module.exports = setContext;