'use strict';

function generateNameOf(fileName,  { isFirstLetterUpper = false, limiterOfName = '.', separator = '-' } = {} = {}) {
  const Helper = this;
  const Types = Helper['helper.types.js']();
  let name, twoChars, oneLetter, separatorPosition, oneLetterUpper;

  return (function init() {
    return {
      getStartAndEndIndex() {
        const indexes = Helper['helper.all-indexes-of.js'](limiterOfName, fileName);
        Types.isUndefined(indexes[1])
        ? this.indexes = { start: 0, end: indexes[0] }
        : this.indexes = { start: indexes[0] + 1, end: indexes[1] };
        return this;
      },
      cleanName() {
        name = fileName.slice(this.indexes.start, this.indexes.end);
        this.firstLetterUpper();
        return this;
      },
      firstLetterUpper() {
        if(isFirstLetterUpper) {
          name = name.replace(name[0], name[0].toUpperCase());
        }
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
generateNameOf.priority = 3;
module.exports = generateNameOf;
