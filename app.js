
// const Main = require('./modules/main/main.module');
// const main = new Main({ appConfigPath: `${__dirname}/app.config.js` });
// module.exports = main.getApp();


const Start = require('./src/core');
const app = new Start({ appConfigPath: `${__dirname}/app.config.js` });

module.exports = app;
