'use strict';

class ExtendedClass {
  constructor(context) {
    const { Helper } = context;
    const { Classes } = context;

    const result = Helper
      .getFiles(__dirname)
      .ignore([require('path').basename(__filename)])
      .requireAll({ isFirstLetterUpper: true  })
      .getFinalResultOfAll();

    result.names.forEach(name => {
      this[name] = result.requireds[name](Classes[result.requireds[name].dependece]);
    });
  }
}

ExtendedClass.priority = 8;
module.exports = ExtendedClass;
