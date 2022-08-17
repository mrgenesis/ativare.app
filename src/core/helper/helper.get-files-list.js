'use strict';
const 
  fs = require('fs')
  , { extname } = require('path');

/**
 * Faz uma busca por todos arquivos presentes no caminho desejado.
 * @param {String} folderPath - o caminho completo da pasta que será lida
 * @param {Object} options - opções que controlam o que/como será pesquisado
 * @returns {Array} - a lista dos nomes dos arquivos do diretório informado
 */
function getFilesList(folderPath, { ext = '.js', ignore, withPath } = {}) {
  let result;
  const isExtension = fileName => extname(fileName) === ext;
  const ignoreFile = fileName => ignore.indexOf(fileName) === -1;
  const joinFullPath = fileName => `${folderPath}/${fileName}`;
  
  result = fs.readdirSync(folderPath);
  result = result.filter(isExtension);
  
  if (Array.isArray(ignore)) {
    result = result.filter(ignoreFile);
  }
  
  if(withPath) {
    result = result.map(joinFullPath);
  }
  
  return result;
}

getFilesList.priority = 1;
module.exports = getFilesList;
