'use strict';
const msal = require('@azure/msal-node');

module.exports = function setContext(context) {   
  const { ServiceFactory } = context.Classes;
  async function authenticate(req, appConfig) {
    const msalInstance = new msal.ConfidentialClientApplication(appConfig.authenticate.azuread.msalConfig);

    const cryptoProvider = new msal.CryptoProvider();    
    req.session.csrfToken = cryptoProvider.createNewGuid();

    const state = cryptoProvider.base64Encode(JSON.stringify({
      csrfToken: req.session.csrfToken,
      redrectTo: '/'
    }));

    const authCodeUrlRequestParams = {
      state: state,
      scopes: [],
    };
    const authCodeRequestParams = {
      scopes: [],
    };
    req.session.pkceCodes = await cryptoProvider.generatePkceCodes();
    req.session.pkceCodes.challengeMethod = 'S256';
    
    req.session.authCodeUrlRequest = {
      redirectUri: appConfig.authenticate.azuread.redirectUri,
      responseMode: 'form_post', // recommended for confidential clients
      codeChallenge: req.session.pkceCodes.challenge,
      codeChallengeMethod: req.session.pkceCodes.challengeMethod,
      ...authCodeUrlRequestParams,
    };
    req.session.authCodeRequest = {
      redirectUri: appConfig.authenticate.azuread.redirectUri,
      code: "",
      ...authCodeRequestParams,
    };
    const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(req.session.authCodeUrlRequest);    
    return authCodeUrlResponse;    
  }
  return new ServiceFactory(authenticate, 'r', 'Gera o link para autenticação no Serviço de Identidade do Azure.');
};