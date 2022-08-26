'use strict';

function parser() {
  class Parser {
    #reference;
    setValue(v) {
      this.#reference = v;
      return this;
    }
    securityJsonParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return null;
      }
    }
    toStringify(v) {
      if(typeof v === 'string') {
        return v;
      }
      return String(JSON.stringify(v));
    }
    toBase64(str = this.#reference) {
      const buff = Buffer.from(str);
      return buff.toString('base64');
    }
    decodeBase64(str = this.#reference) {
      const buff = Buffer.from(str, 'base64');
      return buff.toString();
    }
  }
  return new Parser();  
}
parser.priority = 1;
module.exports = parser;
