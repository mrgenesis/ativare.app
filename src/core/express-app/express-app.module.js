'use strict';
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const BearerStrategy = require("passport-azure-ad").BearerStrategy;

class ExpressApp {
  #app;
  #context;
  #appConfig;
  constructor(context, appConfig) {
    this.#context = context;
    this.#appConfig = appConfig;
    this.#app = express();

    this.#app.use(morgan('combined'));
    this.#app.set('applicationResources', {});
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    
    this.configureAtuh();
    
    this.activeCorsIfIsDev();
    this.setMiddlewares();
  }
  
  getApp() {
    return this.#app;
  }
  configureAtuh() {
    const options = this.#context.appConfig.authenticate.azuread.bearerOptions;
    const optionsConfigured = {
      identityMetadata: `https://${options.authority}/${options.tenantID}/${options.version}/${options.discovery}`,
      issue: `https://${options.authority}/${options.tenantID}/${options.version}`,
      clientID: options.clientID,
      audience: options.audience,
      validateIssuer: options.validateIssuer,
      passReqToCallback: options.passReqToCallback,
      loggingLevel: options.loggingLevel,
      scope: options.scope
    };
    const bearerStrategy = new BearerStrategy(optionsConfigured, (token, done) => {
      // Send user info using the second argument
      const userProperty = new this.#context.Classes.UserHandler(token);
      done(null, userProperty/* req.user */, token);
    });
    this.#app.use(passport.initialize());
    passport.use(bearerStrategy);
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
  activeCorsIfIsDev() {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(`>>>>>>> CORS is actived on localhost to Dev|Test environment.`);
      return this.#app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        const origin = req.headers.origin;
        console.log(`>>>>>>> Dev|Test allowed origin ${origin}`);
          return next();
      });
    }
    console.log('Access-Control-Allow-Origin NÃO foi ativado. Ative isso no servidor.');
  }
  addErrorHandler() {
    const AppError = this.#context.AppError;
    const Subscriber = this.#context.Subscriber;
    this.#app.use(function errorHandler(err, req, res, __) {
      const error = AppError.formatter(err);
      error.setSentData(req);
      error.setResponser(res);
      Subscriber.emit('error_registry', error);
    });
  }
}

ExpressApp.type = 'none';
module.exports = ExpressApp;
