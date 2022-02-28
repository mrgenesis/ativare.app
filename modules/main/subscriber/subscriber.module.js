'use strict';

// const ee = new EventEmitter();

class Subscriber {
  #context;
  constructor(context) {
    this.#context = context;
    const EventEmitter = require('events');
    const ee = new EventEmitter();

    ee.on('send_email', data => this.sendEmail(data));
    ee.on('app_error', err => this.appError(err));
    return ee;
  }
  sendEmail(data) {
    console.log('Simulação do e-mail enviado. Dados:', data);
  }
  appError(err) {
    const AppError = this.#context.AppError;
    let unknowledge;
    try {
      if (!err.isAppError) {
        unknowledge = AppError.unknowledge(err);
        err.errorId = unknowledge.errorId;
      }
      this.#context.model.debug().create({ errorId: err.errorId, message: err.message, rawData: err });
    } catch (e) {
      console.log('Não não possível gravar o erro no banco de dados.', e);
    }
  }
}

Subscriber.priority = 9;
module.exports = Subscriber;
