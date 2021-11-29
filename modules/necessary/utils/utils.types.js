'use strict';

module.exports = function types() {
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
    
  }

  return new TypesModule();
}
