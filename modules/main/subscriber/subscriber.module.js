'use strict';

// const ee = new EventEmitter();

class Subscriber {
  #context;
  constructor(context) {
    this.#context = context;
    const EventEmitter = require('events');
    const ee = new EventEmitter();

    ee.on('send_email', (body, data) => this.sendEmail(body, data));
    ee.on('app_error', err => this.appError(err));
    return ee;
  }
  sendEmail(body, data) {
    const sender = require('./subscriber.sender');
    const params = {
      Destination: {
      ToAddresses: [ ...data.to ],
        CcAddresses: [ ...data.cc ],
      },
      Message: {
        Body: {
          Text: {
           Charset: "UTF-8",
           Data: JSON.stringify(body)
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: data.subject
         }
        },
      Source: 'ativare@systems.webservico.net', // TODO: colocar o email de origem no arquivo de configuração
      ReplyToAddresses: [ ...data.replyTo ],
    };
    sender(params);
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
