'use strict';

function execAccessAnalyzer(context) {
  return function setDependencies(resource, CurrentModule){
    console.log('<<<< ...setDependencies >>>', resource);

    return function accessAnalyzer(req, res, next) {
      resource.middlewareSet({ propertyName: 'accessAnalyzer', data: 'olá' })
      console.log('<<<< ...accessAnalyzer >>>');
      next();
    }
    
  }
}

module.exports = execAccessAnalyzer;
