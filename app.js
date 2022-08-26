
const start = require('./src/core');
module.exports = (db) => start({ db, appConfigPath: `${__dirname}/app.config.js` });
