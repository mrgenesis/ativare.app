'use strict';

class Main {
  #loadeds = [];
  #priorities = [];
  #context = {};
  #app;

  constructor({ appConfigPath } = {}) {
    this.#context.main = this;
    this.folderList = this.getFolderList();
    this.#loadeds = this.requireAll();
    this.loadPerPriority();
    
    const { InitSystem } = this.#context;    
    
    InitSystem.configure(appConfigPath);
    InitSystem.make();
    this.#app = InitSystem.getApp();
  }
  getApp() {
    return this.#app;
  }
  getFolderList(folderPath = __dirname) {
    const fs = require('fs');
    const thisDir = fs.readdirSync(folderPath, { withFileTypes: true });
    const folderList = thisDir.filter(item => item.isDirectory()).map(dir => dir.name);
    return folderList;  
  }
  requireAll({ folderList = this.folderList, folderPath = __dirname } = {}) {
    let mainModules = [];
    folderList.reduce((modulesList, dir) => {      
      const module = require(`${folderPath}/${dir}/${dir}.module`);
      modulesList.push(module);
      this.setAndSortPriority(module.priority);
      return modulesList;
    }, mainModules);
    return mainModules;
  }
  setAndSortPriority(priority, priorities = this.#priorities) {
    if(priorities.indexOf(priority) === -1) {
      priorities.push(priority);
      priorities.sort((a, b) => a - b);
    }
  }
  loadPerPriority({ priorities = this.#priorities, context = this.#context } = {}) {
    priorities.forEach(priority => {
      this.loaderPerPriority({ priority });
    });
  }
  loaderPerPriority({ priority, loadeds = this.#loadeds, context = this.#context } = {}) {
    loadeds.forEach(Module => {
      if (Module.priority === priority) {
        const name = Object.getOwnPropertyDescriptor(Module, 'name').value;
        this.#context[name] = new Module(this.#context);
      }
    });
  }

}
// const main = new Main({ appConfigPath: '/mnt/p/clientes/ativare/api/app.config.js' });
//main.getContext();
Main.type = 'none';
module.exports = Main;
