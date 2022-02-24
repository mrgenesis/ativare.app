'use strict';

function AppError({ name, message, statusCode, arn } = {}) {
  this.errorId = Date.now() + '.' + (Date.now()).toString(36) + Math.random().toString(36);
  this.name = name || this.constructor.name;
  this.message = message || 'Internal error server';
  this.statusCode = statusCode || 500;
  this.stack = (new Error()).stack;
  this.arn = arn;
}

AppError.prototype.isAppError = true;


AppError.prototype.setUnknowledge = function setUnknowledge(unknowledge) {
  this.unknowledge = unknowledge;
}

AppError.prototype.response = function response() {
  return {
    errorId: this.errorId,
    arn: this.arn,
    name: this.name,
    message: this.message,
    statusCode: this.statusCode
  }
}

module.exports = AppError;
