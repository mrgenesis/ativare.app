'use strict';

module.exports = function materialService() {
  const MaterialModel = this.model();
  const filePath = `${__dirname}/material.service`;
  const filesList = this.tools.getFilesList(filePath, { withPath: true });
  let MaterialService = {};

  filesList.forEach(objService => {
    const newObj = require(objService)(MaterialModel);
    MaterialService = { ...MaterialService, ...newObj };
  });

  return MaterialService;
}