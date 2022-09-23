'use strict';

function comparator() {
  class ComparatorModule {
    #value;
    setValue(v) { 
      this.#value = v; 
      return this;
    }
    areDeeplyEquals(something, isDeepEqual) {
      return something === isDeepEqual;
    }
    areEquals(something, isEqual) {
      return something == isEqual;
    }
    areDifferents(x, y = this.#value) {
      return x !== y;
    }
  }

  return new ComparatorModule();
}
comparator.priority = 1;
module.exports = comparator;
