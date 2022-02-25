'use strict';

function types() {
  class TypesModule {
    deepTypeof(mixed) {
      const type = typeof mixed;
    
      if (this.isNull(mixed)) {
        return 'null';
      } else if(type === 'number') {
        return this.isInteger(value) ? 'integer' : 'float';
      }
      return type;
    }

    isArray(arr) {
      return Array.isArray(arr);
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
    isNotFunction(x) {
      return !this.isFunction(x);
    }

    isObject(obj) {
      return this.deepTypeof(obj) === 'object';
    }

    isString(str) {
      return typeof str === 'string';
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
