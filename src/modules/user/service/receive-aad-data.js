'use strict';
const msal = require('@azure/msal-node');

module.exports = function setContext(context) { 
  const msalInstance = new msal.ConfidentialClientApplication(context.appConfig.authenticate.azuread.msalConfig);
  const { ServiceFactory } = context.Classes;
  const types = new context.Helper.types();  
  const parser = new context.Helper.parser();  

  async function receiveAadData(reqHandler, reqBody) {
    let decodedObjString
      , state = reqBody.state
      , tokenResponse;
    if (types.isUndefined(state)) {
      throw new context.AppError.CreatorError('A propriedade "state" não está definida no body da requisição', 400);
    }
    if (types.isNotString(state)) {
      throw new context.AppError.CreatorError('A propriedade "state" deve ser uma string', 400);
    }
    decodedObjString = parser.decodeBase64(state);
    state = parser.securityJsonParse(decodedObjString);
    if (types.isNull(state)) {
      throw new context.AppError.CreatorError('A propriedade "state" deve ser um objeto em forma de string base 64', 400);
    }
    if (types.isUndefined(state.csrfToken)) {
      throw new context.AppError.CreatorError('A propriedade state.csrfToken não está definida no objeto', 400);
    }
    if (types.areDifferents(state.csrfToken, reqHandler.session.csrfToken)) {
      throw new context.AppError.CreatorError('csrfToken enviado não está correto');
    }
    if (types.isUndefined(state.redirectTo)) {
      state.redirectTo = '/';
    }
    reqHandler.setAuthCode(reqBody.code);
    try {
      tokenResponse = await msalInstance.acquireTokenByCode(reqHandler.codePair);
    } catch (registryInternalError) {
      throw new context.AppError.CreatorError('Falha na validação do código', 401, registryInternalError);
    }

    reqHandler.setLoginSeccessful(tokenResponse);    
    return state.redirectTo;    
  }
  return new ServiceFactory(receiveAadData, 'w', 'Faz a validação dos dados enviados pelo Azure AD.');
};
