function Util() {

  this.getFilesList = require('./utils.get-files-list');
  this.allIndexesOf = require('./utils.all-indexes-of');
  this.types = require('./utils.types');
  this.generateNameOf = require('./util.generate-name-of');

  const filesList = this.getFilesList(__dirname, { ignore: ['utils.module.js', 'module.js'] });
  
  filesList.forEach(file => {
    const name = this.generateNameOf(file);
    this[name] = require(`./${file}`);
  })
}
module.exports = Util;
