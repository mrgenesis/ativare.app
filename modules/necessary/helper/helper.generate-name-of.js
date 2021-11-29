'use strict';

module.exports = function generateNameOf(fileName, { options: { limiterOfName = '.', separator = '-' } = {} } = {}) {
  const allIndexesOf = require('../utils/utils.all-indexes-of');
  const Types = require('../utils/utils.types')();
  let name, twoChars, oneLetter, separatorPosition, oneLetterUpper;

  return (function init() {
    return {
      getStartAndEndIndex() {
        const indexes = allIndexesOf(limiterOfName, fileName);
        Types.isUndefined(indexes[1])
        ? this.indexes = { start: 0, end: indexes[0] }
        : this.indexes = { start: indexes[0] + 1, end: indexes[1] };
        return this;
      },
      cleanName() {
        name = fileName.slice(this.indexes.start, this.indexes.end);
        return this;
      },
      getNameFunction() {
        while (this.haveSeparator()) {
          this.format();
        }
        return name;
      },
      haveSeparator() {
        this.setSeparetorPosition();
        return separatorPosition > -1;
      },
      setSeparetorPosition() {
        separatorPosition = name.indexOf(separator);
      },
      format() {
        this.setTwoChars();
        this.removeSeparatorOfTwoChars();
        this.setUpperCase()
        this.updateNameFunction();
      },
      setTwoChars() {
        twoChars = name.substr(separatorPosition, 2);
      },
      removeSeparatorOfTwoChars() {
        oneLetter = twoChars.replace(separator, '');
      },
      setUpperCase() {
        oneLetterUpper = oneLetter.toUpperCase();
      },
      updateNameFunction() {
        name = name.replace(twoChars, oneLetterUpper);
      }
    };
  })()
  .getStartAndEndIndex()
  .cleanName()
  .getNameFunction(); 
}
