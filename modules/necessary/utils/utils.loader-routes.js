'use strict';

module.exports = function loaderRoutes({
  app,
  pathFolder,
  othes = {}
}) {
  const report = {};  
  const getFoldersList = othes.getFoldersList || require('./utils.get-folders-list');
  const foldersList = getFoldersList({ pathFolder });

  foldersList.forEach(folder => {
    const RouteModule = require(`${pathFolder}/${folder}/${folder}.module.js`);    
    const haveRoute = typeof RouteModule.controller === 'function';    
    if (haveRoute) {
      report.loaded = {
        ...report.loaded,
        [RouteModule.constructor.name]: RouteModule
      };
      // app.use(RouteModule.authController);
      RouteModule.controller(app);
    } else {
      report.notLoaded = {
        ...report.notLoaded,
        [RouteModule.constructor.name]: RouteModule
      };
    }

  });

  return report;

}
