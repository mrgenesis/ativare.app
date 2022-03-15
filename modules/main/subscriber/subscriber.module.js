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
    //return;
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
           Data: JSON.stringify(body, null, '  ')
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
    sender(params).then(err => {
      if(err) {
        this.appError(err);
      }
    });
  }
  appError(err) {
    const AppError = this.#context.AppError;
    let appError;
    try {
      if (!err.isAppError) {
        appError = new AppError.appError(err);
        err.errorId = appError.errorId;
      }
      // TODO salvar isso no S3 por meio de um recuros que deve ser adicionado ao userAuth
      this.#context.model.debug().create({ errorId: err.errorId, rawData: appError || err });
    } catch (e) {
      console.log('Não foi possível gravar o erro no banco de dados.', e);
    }
  }
}

Subscriber.priority = 9;
module.exports = Subscriber;
