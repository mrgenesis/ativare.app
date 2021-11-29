'use strict';

const getFilesList = require('./utils.get-files-list');

module.exports = function loaderFiles({ 
  loadHere = {}, 
  folder = __dirname, 
  ignore = ['utils.module.js'],
  removeTxt = /utils\.|\.js/g,
  separator = '-',
  othes = {}
}) {


  const filesList = othes.filesList || getFilesList(folder, { ignore });

  filesList.forEach(file => {
    let name = file.replace(removeTxt, '');
    let aux;

    while(name.indexOf(separator) > -1) {
      aux = name.substr(name.indexOf(separator), 2);
      name = name.replace(aux, aux.replace(separator, '').toUpperCase());
    }

    loadHere[name] = require(`${folder}/${file}`);
  });

}