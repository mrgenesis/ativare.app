'use strict';

class AppError extends Error {
  constructor(err) {
    super(err.message);
    this.errorId = (Date.now()).toString(36) + Math.random().toString(36);
    this.name = err.name || this.constructor.name;
    this.statusCode = err.statusCode || 500;
    (err.stack) ? this.stack = err.stack : '';
    this.arn = err.arn;
    this.isAppError = true;
    this.changeEnumerablePropertiesToTrue();
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
  changeEnumerablePropertiesToTrue() {
    Object.defineProperty(this, 'message', { enumerable: true });
    Object.defineProperty(this, 'stack', { enumerable: true });
  }
}

module.exports = AppError;
