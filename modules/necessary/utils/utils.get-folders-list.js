'use strict';

module.exports = function getFoldersList({ pathFolder, withPath }) {
  const fs = require('fs');

  let result = [];

  result = fs.readdirSync(pathFolder, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

  if (withPath) {
    result = result.map(folder => `${pathFolder}/${folder}`);
  }

  return result;

}