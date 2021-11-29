'use strict';

module.exports = function getFolders(pathFolder) {
  const fs = require('fs');

  let namesList = [];
  let withPath = [];

  namesList = fs.readdirSync(pathFolder, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

  return {
    namesList() {
      return namesList;
    },
    pathNamesList() {
      return foldersList.map(folder => `${pathFolder}/${folder}`);
    }
  };

}