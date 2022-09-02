'use strict';
const express = require('express');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const morgan = require('morgan');

const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'api.server',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
};

class ExpressApp {
  #app;
  #context;
  #appConfig;
  constructor(context, appConfig) {
    this.#context = context;
    this.#appConfig = appConfig;
    this.#app = express();
    this.#app.use(cookieParse());
    this.#app.use(session(sessionConfig));

    this.#app.use(morgan('combined'));
    this.#app.set('applicationResources', {});
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false }));
    
    
    this.includeCredentials();
    this.activeCorsIfIsDev();
    this.setMiddlewares();
  }

  getApp() {
    return this.#app;
  }
  setMiddlewares() { // TODO: definir appConfig dentro de context
    const { Middleware } = this.#context;
    const configuredGlobalMiddlewaresList = Middleware.getGlobalMiddlewares().map(middlewareWithConfig => {
      return middlewareWithConfig(this.#appConfig);
    });
    this.#app.use(configuredGlobalMiddlewaresList);
  }
  setRoute(module) {
    this.#app.use(module.entry, module.getRouter(this.#appConfig));
  }
  setApplicationResources(module) {
    this.#app.get('applicationResources')[module.name] = module.getResourcesAll();
  }
  getApplicationResources(name) {
    return this.#app.get('applicationResources')[name];
  }
  includeCredentials() {
    this.#app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
  }
  activeCorsIfIsDev() {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(`>>>>>>> request origin is actived on localhost.`);
      this.#app.use((req, res, next) => {
        const origin = req.headers.origin
        const allowed = /http:\/\/localhost:[\d]{4}/;
        console.log(`>>>>>>> Dev|Test allowed.test(${origin}) <<${allowed.test(origin)}>>`);
          if (allowed.test(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          }
          return next();
      });
    }
    console.log('Access-Control-Allow-Origin NÃO foi ativado. Ative isso no servidor.');
  }
  addErrorHandler() {
    const AppError = this.#context.AppError;
    this.#app.use(function errorHandler(err, _, res, __) {
      const error = AppError.formatter(err);
      res.status(err.statusCode).json(error.response());
    });
  }



}



ExpressApp.type = 'none';
module.exports = ExpressApp;