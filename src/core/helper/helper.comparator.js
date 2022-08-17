'use strict';

function comparator() {
  class ComparatorModule {
    areDeeplyEquals(something, isDeepEqual) {
      return something === isDeepEqual;
    }
    areEquals(something, isEqual) {
      return something == isEqual;
    }
  }

  return new ComparatorModule();
}
comparator.priority = 1;
module.exports = comparator;
