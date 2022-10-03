'use strict';

class AppError extends Error {
  #res;
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
  get res() {
    return this.#res;
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
  setSentData(req) {
    this.data = {};
    this.data.param = req.param;
    this.data.query = req.query;
    this.data.body = req.body;
    this.user = req.user.getUserData();
  }
  setResponser(res) {
    this.#res = res;
  }
  internalInfo({ stringify = true } = {}) {
    const info = {
      user: this.user,
      data: this.data,
      errorId: this.errorId,
      arn: this.arn,
      name: this.name,
      message: this.message,
      stack: this.stack,
      lastStack: (/.*\.js.*/).exec(this.stack)[0],
      statusCode: this.statusCode
    }
    return stringify ? JSON.stringify(info) : info;
  }
  putAditionalMessage(msg) {
    this.message += ` [${msg}]`;
  }
  changeEnumerablePropertiesToTrue() {
    Object.defineProperty(this, 'message', { enumerable: true });
    Object.defineProperty(this, 'stack', { enumerable: true });
  }
}

module.exports = AppError;
