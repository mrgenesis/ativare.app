'use strict';

function AppError({ name, message, statusCode }) {
  this.name = name || this.constructor.name;
  this.message = message || 'Internal error server';
  this.statusCode = statusCode || 500;
  this.stack = (new Error()).stack;
}

AppError.prototype.isAppError = true;

AppError.prototype.setMessage = function setMesage(message) {
  this.message = message;
}
AppError.prototype.setStatusCode = function setStatusCode(statusCode) {
  this.statusCode = statusCode;
}

module.exports = AppError;
