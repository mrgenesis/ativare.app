'use strict';

const ROOT_PROJECT = __dirname;

function appConfig(context) {
  const path = require('path')
      , fs = require('fs')
      , Types = context.Helper.types();
  let customConfig = {};

  const CUSTOM_CONFIG_FILE_NAME = process.env.CUSTOM_CONFIG_FILE_NAME;
  if (Types.isString(CUSTOM_CONFIG_FILE_NAME)) {
   const configFilePath = path.resolve(CUSTOM_CONFIG_FILE_NAME);
    if(fs.existsSync(configFilePath)) {
      customConfig = require(configFilePath);
    }
  }

  return {
    "databases": {
      "mongodb": {
        "srv": true,
        "server": process.env.DB_HOST,
        "params": "retryWrites=true&w=majority",
        "database": process.env.DB_NAME,
        "user": process.env.DB_USER,
        "password": process.env.DB_PASS
      }
    },
    "dbBrand": "mongodb",
    "rootProject": ROOT_PROJECT,
    "modulesFolder": `${ROOT_PROJECT}/src/modules`,
    "dotEnvDev": `${ROOT_PROJECT}/.env.development`,
    "appFolderName": 'express-app',
    // mainModuleFolderPath,
    ...customConfig
  }
}

appConfig.getDotEnvDev = () => `${ROOT_PROJECT}/.env.development`;

module.exports = appConfig;
