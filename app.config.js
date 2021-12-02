'use strict';

const ROOT_PROJECT = __dirname;

function appConfig() {
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
    "modulesFolder": `${ROOT_PROJECT}/modules`
  }
}

appConfig.getDotEnvDev = () => `${ROOT_PROJECT}/.env.development`;

module.exports = appConfig;
