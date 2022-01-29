'use strict';

function execAccessAnalyzer(context) {
  function accessAnalyzer(src) {
    console.log('<<<< ...accessAnalyzer src.name >>>', src.name);
    return function accessAnalyzer(req, res, next) {
    console.log('<<<< ...accessAnalyzer running... src.name >>>', src.name);
    next();
    }
  }
  accessAnalyzer.type = 'module';
  return accessAnalyzer;
}

module.exports = execAccessAnalyzer;
