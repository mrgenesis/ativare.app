'use strict';

function prepateConnectionString(config) {
  let connectionString = (config.srv) ? 'mongodb+srv://' : 'mongodb://';
  if (config.user) {
    connectionString += `${config.user}:${config.password}@`;
  }
  connectionString += `${config.server}/${config.database}`;
  if (config.params) {
    connectionString += `?${config.params}`;
  }

  return connectionString; // fim da leitura de 18/05/2021
}

module.exports = prepateConnectionString;