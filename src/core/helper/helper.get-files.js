'use strict';
const 
  fs = require('fs')
  , { extname } = require('path');

/**
 * Faz uma busca por todos arquivos presentes no caminho desejado.
 * @param {String} folderPath - o caminho completo da pasta que será lida
 * @returns {Object} - o objeto dos nomes dos arquivos do diretório informado
 */
function getFiles(folderPath) {
  const Helper = this;
  const ComparatorModule = Helper.comparator();
  const result = { list: [], requireds: {}, names: [], resultOfRunAll: {}, withPathList: [] };
  
  result.list = fs.existsSync(folderPath) ? fs.readdirSync(folderPath) : [];
  
  return {
    list() {
      return result.list
    },
    filterExtension(ext) {
      const filterExt = file => 
        ComparatorModule.areDeeplyEquals(extname(file), ext);
      
      result.list = result.list.filter(filterExt);
      return this;
    },
    withPathList() {
      const joinFullPath = fileName => `${folderPath}/${fileName}`;
      result.withPathList = result.list.map(joinFullPath);
      return result.withPathList;
    },
    ignore(list = []) {
      result.list = result.list.filter(fileName => list.indexOf(fileName) === -1);
      result.withPathList = result.withPathList.filter(fileName => list.join('#').indexOf(fileName) === -1);
      return this;
    },
    requireAll(options = {}) {
      this.list().forEach(file => {
        const name = Helper.generateNameOf(file, options);
        result.requireds[name] = require(`${folderPath}/${file}`);        
        result.names.push(name);
      });
      return this;
    },
    put({ here, property = 'requireds' } = {}) {
      for (let i in result[property]) {
        here[i] = result[property][i];
      }
      return this;
    },
    runAll(param) {
      result.names.forEach(name => {
        const runned = result.requireds[name](param);
        if (runned.name) {
          result.resultOfRunAll[runned.name] = runned;
          return;
        }
        result.resultOfRunAll[name] = runned;
      });
      return result.resultOfRunAll;
    },
    getFinalResultOfAll() {
      return { ...result };
    }
  };
}

getFiles.priority = 3;
module.exports = getFiles;
