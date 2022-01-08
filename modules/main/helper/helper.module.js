'use strict';

class Helper {
  #fileList = [];
  #folder;
  #ignoreFilesList = ['helper.module.js'];
  #priorities = [];
  #context;

  constructor(context) {
    this.#context = context;
    this.#folder = __dirname;
    this.getFilesList(this.#folder, this.#ignoreFilesList);
    this.requireAll()
    this.#priorities.forEach(priority => this.loadPriority(priority));
  }
  loadPriority(priority) {
    for(let i in this) {
      if (this[i].priority === priority && this.#fileList.indexOf(i) > -1) {
        const name = this['helper.generate-name-of.js'](i);
        this[name] = this[i];
      }
    }
  }
  getFilesList(folderPath, ignore = []) {
    const fs = require('fs')
    const ignoreFile = fileName => ignore.indexOf(fileName) === -1;
    let result;
    
    result = fs.readdirSync(folderPath);
    result = result.filter(ignoreFile);
    
    this.#fileList = result;
  }
  requireAll() {
    this.#fileList.forEach(file => {
      this[file] = require(`${this.#folder}/${file}`);
      this.#context.main.setAndSortPriority(this[file].priority, this.#priorities);
    });
  }
}
Helper.priority = 1;
module.exports = Helper;
