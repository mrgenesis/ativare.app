'use strict';

class Classes {
  constructor(context) {
    
    const { Helper } = context;
    Helper
      .getFiles(__dirname)
      .ignore([require('path').basename(__filename)])
      .requireAll({ isFirstLetterUpper: true  })
      .put({ here: this });
  }
}

Classes.priority = 2;
module.exports = Classes;
