'use strict';

class Classes {
  constructor(context) {
    const { Helper } = context

    function generateNameOf(folderName) {
      return Helper.generateNameOf(folderName, { options: { isFirstLetterUpper: true }});
    }
    
    Helper
      .getFiles(__dirname)
      .requireAll({ putHere: this, generateNameOf });
  }
}

Classes.priority = 2;
module.exports = Classes;
