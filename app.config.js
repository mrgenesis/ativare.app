'use strict';

const ROOT_PROJECT = __dirname;

function appConfig() {
  const path = require('path')
      , fs = require('fs')
      , Types = this.tools.types();
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
        "password": process.env.DB_PASSWORD
      }
    },
    "rootProject": ROOT_PROJECT,
    "modulesFolder": `${ROOT_PROJECT}/modules`,
    ...customConfig
  }
}

appConfig.getDotEnvDev = () => `${ROOT_PROJECT}/.env.development`;

module.exports = appConfig;
