'use strict';

function types() {
  class TypesModule {
    expect(x) {
      this.reference = x;
      return this;
    }
    tellMe() {
      return this.deepTypeof(this.reference);
    }
    deepTypeof(mixed = this.reference) {
      const type = typeof mixed;
    
      if (this.isNull(mixed)) {
        return 'null';
      } else if(type === 'number') {
        return this.isInteger(value) ? 'integer' : 'float';
      }
      return type;
    }
    toBe(v) {
      return this.reference === v;
    }
    isDifferent(x, y = this.reference) {
      return x !== y;
    }

    isArray(arr) {
      return Array.isArray(arr);
    }
    toBeArray() {
      return this.isArray(this.reference);
    }

    isFloat(theFloat) {
      if (typeof theFloat === 'number') {
        return theFloat % 1 !== 0;
      }
      return false;
    }

    isFunction(fn) {
      return typeof fn === 'function';
    }
    toBeFunction() {
      return this.isFunction(this.reference);
    }
    isNotFunction(x) {
      return !this.isFunction(x);
    }

    isObject(obj) {
      return this.deepTypeof(obj) === 'object';
    }

    isString(str) {
      return typeof str === 'string';
    }
    isNotString(v) {
      return typeof v !== 'string';
    }

    isUndefined(undefinedVelue) {
      return typeof undefinedVelue === 'undefined';
    }

    isInteger(theInteger) {
      if (typeof theInteger === 'number') {
        return theInteger % 1 === 0;
      }
      return false;
    }

    isNull(n) {
      return n === null;
    }
    isFalse(v) {
      return v === false;
    }
    
  }

  return new TypesModule();
}

types.priority = 1;
module.exports = types;
