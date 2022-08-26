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
        "msalConfig": {
          "auth": {
            clientId: process.env.CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
            authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
            clientSecret: process.env.CLIENT_SECRET // Client secret generated from the app registration in Azure portal
          },
          "cache": {
            cacheLocation: "sessionStorage", // This configures where your cache will be stored
            storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
          }
        },
        "redirectUri": process.env.REDIRECT_URI,
        "postLogoutRedirectUri": process.env.POST_LOGOUT_REDIRECT_URI,
        "graphMeEndPoit": process.env.GRAPH_API_ENDPOINT + "v1.0/me"
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
