'use strict';

function getFolders(pathFolder, ignoreList) {
  const fs = require('fs');

  let namesList = [];

  namesList = fs.readdirSync(pathFolder, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

  return {
    namesList() {
      return namesList;
    },
    pathNamesList() {
      return foldersList.map(folder => `${pathFolder}/${folder}`);
    },
    ignore(list = ignoreList) {
      namesList = namesList.filter(name => list.indexOf(name) === -1);
      return this;
    }
  };

}
getFolders.priority = 1;
module.exports = getFolders;
