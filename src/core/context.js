

class Context {

  addProperty(name, value) {
    this[name] = value;
  }
  addSubProperty(parentName, childName, value) {
    if(this.addPropertyWithSecurity(parentName, {})) {
      return this[parentName][childName] = value;
    }
    return this[parentName][childName] = value;
  }
  addPropertyWithSecurity(property, value) {
    const has = this.hasProperty(property);
    if(has) {
      return false;
    }
    this.addProperty(property, value);
    return true;
  }
  getFolderList(folderPath = __dirname) {
    const fs = require('fs');
    const thisDir = fs.readdirSync(folderPath, { withFileTypes: true });
    const folderList = thisDir.filter(item => item.isDirectory()).map(dir => dir.name);
    return folderList;  
  }
  
}

module.exports = Context;
