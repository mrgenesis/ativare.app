
class CreatorError extends Error {
  constructor(message, statusCode = 500, internal = null) {
    super(message);
    this.statusCode = statusCode;
    if (internal) {
      this.internal = internal;
    }
  }
  setArn(arn) {
    this.arn = arn || '@Global';
  }

}

module.exports = CreatorError;