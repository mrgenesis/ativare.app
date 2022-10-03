'use strict';
const EventEmitter = require('events');
const sendgrid = require('./subscriber.sendgrid');

class Subscriber extends EventEmitter {
  #context;
  constructor(context) {
    super();
    this.#context = context;

    this.on('error_registry', (error) => this.errorRegistry(error));
    this.on('update_fixed_materials', (updated) => this.updateFixedMaterials(updated));
    this.on('send_email', (body, data) => this.sendEmail(body, data));
    this.on('app_error', err => this.appError(err));
  }
  async errorRegistry(error) {
    const Types = this.#context.Helper.types();
    const apiKey = this.#context.appConfig.vendor.emailSender.sendgrid.apiKey;
    if (Types.isFalseValue(error.isAppError) || Types.areDifferents(error.statusCode, 500)) {
      error.res.status(error.statusCode).json(error.response());
      return;
    }
    try {
      this.#context.model.debug().find({ supportStatus: 'opened' }).then(openedList => {
        const errorLocationExists = openedList.find(item => item.rawData.lastStack === error.internalInfo({ stringify: false }).lastStack);
        if (Types.isUndefined(errorLocationExists)) {
          const data = error.internalInfo({ stringify: false });
            sendgrid({
              apiKey,
              from: this.#context.appConfig.fromEmail,
              to: this.#context.appConfig.supportEmail,
              subject: `${data.message} - ${data.lastStack}`,
              body: error.internalInfo()
            })
              .then(() => {
                error.putAditionalMessage('Abri um chamado automaticamente. Entre em contato com o administrador para consultar o andamento');
                this.#context.model.debug().create({
                  errorId: error.errorId,
                  rawData: error.internalInfo({ stringify: false })
                });
                error.res.status(error.statusCode).json(error.response());
              })
              .catch(err => {
                error.putAditionalMessage('Houve uma tentativa de abrir um chamado automaticamente, mas ocorreu um novo erro.');
                console.error(`\n --- ${new Date()} ---\n`, error, '\nDetalhes:', JSON.stringify(err), '\n------------------------------\n');
                error.res.status(error.statusCode).json(error.response());
              });
          return;
        }
        error.putAditionalMessage(`O erro "${errorLocationExists.errorId}" é semelhante e já está sendo corrigido. Contate o administrador.`);
        error.res.status(error.statusCode).json(error.response());
      })
        .catch((err) => {
        error.putAditionalMessage(`${err.message}`);
        error.res.status(error.statusCode).json(error.response())
      });
      
    } catch (e) {
      error.putAditionalMessage(`${e.message}`);
      console.error('Erro para enviar o mail para abrir o chamado: ', e); 
    }
  }
  updateFixedMaterials(updated) {
    console.log('updated', updated)
    if (updated.code < 0) {
      this.#context.fixedMaterials = {
        ...this.#context.fixedMaterials,
        [updated.code]: updated
      };
    }
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
