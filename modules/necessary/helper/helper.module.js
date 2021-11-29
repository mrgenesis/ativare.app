'use strict';

function HelperModule() {

  const filesList = this.getFilesList(__dirname, { ignore: ['helper.module.js', 'module.js'] });

  filesList.forEach(file => {
    const name = this.generateNameOf(file);
    this[name] = require(`./${file}`);
  })
  
}


module.exports = HelperModule;