'use strict';
const express = require('express');
const session = require('express-session');
const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: process.env.NODE_ENV === 'production'
  }
};

class ExpressApp {
  #app;
  #context;
  constructor(context) {
    this.#context = context;
    this.#app = express();
    this.#app.use(session(sessionConfig));
    this.#app.set('applicationResources', {});
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false }));
    this.setMiddlewares();
    this.activeCorsIfIsDev();
  }

  getApp() {
    return this.#app;
  }
  setMiddlewares() {
    const { Middleware } = this.#context;
    const globalMiddlewaresList = Middleware.getGlobalMiddlewares();
    this.#app.use(globalMiddlewaresList);
  }
  setRoute(module) {
    this.#app.use(module.entry, module.getRouter());
  }
  setApplicationResources(module) {
    this.#app.get('applicationResources')[module.name] = module.getResourcesAll();
  }
  getApplicationResources(name) {
    return this.#app.get('applicationResources')[name];
  }
  activeCorsIfIsDev() {
    if(process.env.NODE_ENV === 'development') {
      const cors = require('cors');
      this.#app.use(cors());
    }
  }
  addErrorHandler() {
    const subscriber = this.#context.Subscriber;
    this.#app.use(function errorHandler(err, req, res, next) {
      const send = data => ({ AppError: data });
      subscriber.emit('app_error', err);
      if (err.statusCode >= 500) {
        subscriber.emit('send_email', err, { to: ['support@webservico.zohodesk.com'], cc: [], subject: 'Erro desconhecido gerado na API Ativare', replyTo: [req.userAuth.userData.email] });
        return res.status(500).json(send({ message: `Erro desconhecido. Foi aberto um chamado automaticamente. Em breve você receberá uma resposta em seu e-mail cadastrado. - ${err.message}`, errorId: err.errorId }));
      }
      res.status(err.statusCode).json(send(err.response()));
    });
  }



}



ExpressApp.type = 'none';
module.exports = ExpressApp;