'use strict';

class ReqHandler {
  #req;
  constructor(req) {
    this.#req = req;
  }
  get authCodeRequest() {
    return this.#req.session.authCodeRequest;
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
  getCsrfTokenSession() {
    return this.#req.session.csrfToken;
  }

}

module.exports = ReqHandler;
