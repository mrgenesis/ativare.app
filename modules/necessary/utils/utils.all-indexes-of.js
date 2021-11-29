'use strict';

function allIndexesOf(value, iterable) {
  
  let currentIndex;
  let start = 0;
  let indexes = [];
  const finishWhile = () => currentIndex !== -1;
  while(finishWhile()) {
    currentIndex = iterable.indexOf(value, start);
    start = currentIndex + 1;
    finishWhile() ? indexes.push(currentIndex) : '';
  }
  return indexes;
}

module.exports = allIndexesOf;
