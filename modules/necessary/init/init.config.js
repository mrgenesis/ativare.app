'use strict';

module.exports = function config(ENVIRONMENT) {
  return ({
    development: {
      databases: {
        mongodb: {
          "srv": true,
          "server": "cluster0.sgjg9.azure.mongodb.net",
          "params": "retryWrites=true&w=majority",
          "database": "devLocalHost",
          "user": "localhost_user",
          "password": "nZUlYnGv6GuxaK6J"
        }
      },
      modulesPath: `${__dirname}/../..`
    },
    prodution: {
      databases: {
        mongodb: {
          "srv": true,
          "server": process.env.DB_HOST,
          "params": "retryWrites=true&w=majority",
          "database": process.env.DB_NAME,
          "user": process.env.DB_USER,
          "password": process.env.DB_PASSWORD
        }
      }
    }
  })[ENVIRONMENT];
}