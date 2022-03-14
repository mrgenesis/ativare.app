'use strict';

class AppError extends Error {
  constructor(err) {
    super(err.message);
    this.errorId = Date.now() + '.' + (Date.now()).toString(36) + Math.random().toString(36);
    this.name = err.name || this.constructor.name;
    this.statusCode = err.statusCode || 500;
    this.stack = err.stack || (new Error).stack;
    this.arn = err.arn;
    this.isAppError = true;
  }
  response() {
    return {
      errorId: this.errorId,
      arn: this.arn,
      name: this.name,
      message: this.message,
      statusCode: this.statusCode
    }
  }
}

module.exports = AppError;
