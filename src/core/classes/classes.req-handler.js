'use strict';

class ReqHandler {
  #req;
  constructor(req) {
    this.#req = req;
  }
  get codePair() {
    return {
      code: this.#req.session.authCodeRequest.code,
      codeVerifier: this.#req.session.pkceCodes.verifier
    };
  }
  get isAuthenticated() {
    return this.#req.session.isAuthenticated === true;
  }
  setAuthCode(code) {
    this.#req.session.authCodeRequest.code = code;
  }
  setLoginSeccessful(tokenResponse) {
    this.#req.session.accessToken = tokenResponse.accessToken;
    this.#req.session.idToken = tokenResponse.idToken;
    this.#req.session.account = tokenResponse.account;
    this.#req.session.isAuthenticated = true;
  }

}

module.exports = ReqHandler;
