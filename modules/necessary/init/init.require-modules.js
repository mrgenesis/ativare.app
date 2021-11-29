'use strict';

module.exports = function requireModules(folder) {
  this.dataModules = {};
  this.dataModules.modules = [];
  this.dataModules.folders = this.tools.getFolders(folder);

  this.dataModules.folders.namesList().map(name => {
    const Module = require(`${folder}/${name}/${name}.module`);
    this.dataModules.modules.push(Module);
  });
  this.report('requireModules', `Getting modules of folder ${folder}`); 

}
