'use strict';

const ROOT_PROJECT = __dirname;

function appConfig(context) {
  const path = require('path')
    , fs = require('fs')
    , CUSTOM_CONFIG_FILE_NAME = process.env.CUSTOM_CONFIG_FILE_NAME;
  let customConfig = {}
    , Types;
  try {
    Types = context.Helper.types();
    if (Types.isString(CUSTOM_CONFIG_FILE_NAME)) {
      const configFilePath = path.resolve(CUSTOM_CONFIG_FILE_NAME);
       if(fs.existsSync(configFilePath)) {
         customConfig = require(configFilePath);
       }
     }
  } catch(err) {
    console.log('customConfig is not defined', err);
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
    "authenticate": {
      "azuread": {
        "bearerOptions": {
          "tenantID": process.env.TENANT_ID,
          "clientID": process.env.CLIENT_ID,
          "audience": process.env.CLIENT_ID,
          "authority": process.env.AUTHORITY || "login.microsoftonline.com",
          "version": "v2.0",
          "discovery": ".well-known/openid-configuration",
          "scope": ["Ativare.Materiais_e_Orcamentos"],
          "validateIssuer": true,
          "passReqToCallback": false,
          "loggingLevel": "info"
        }
      }
    },
    "dbBrand": "mongodb",
    "rootProject": ROOT_PROJECT,
    "modulesFolder": `${ROOT_PROJECT}/src/modules`,
    "dotEnvDev": `${ROOT_PROJECT}/.env.development`,
    "appFolderName": 'express-app',
    "dataHost": {
      "frontendBaseUrl": process.env.FRONTEND_BASE_URL
    },
    ...customConfig
  }
}

appConfig.getDotEnvDev = () => `${ROOT_PROJECT}/.env.development`;

module.exports = appConfig;
