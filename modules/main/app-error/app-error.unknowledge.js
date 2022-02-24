'use strict';

module.exports = function unknowledge(err) {
  const error = new this.appError();
  error.setUnknowledge(err);
  return error;
}
