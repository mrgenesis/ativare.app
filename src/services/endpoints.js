import Services from "./services";
import * as msalBrowser from '@azure/msal-browser';
import { msalAadClientConfig, acquireTokenParams } from '../config/aad';

export default class Endpoints extends Services {
  #publicClientApp;
  constructor(authData = {}) {
    super();
    this.#publicClientApp = new msalBrowser.PublicClientApplication(msalAadClientConfig);
    this.authData = authData;
  }
  singIn() {
    return new Promise((resolve, reject) => {
      this.#publicClientApp.loginPopup({ scopes: ["openid", "profile"] })
        .then(response => {
          this.authData = response;
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });

  }
  signOut() {
    this.#publicClientApp.logoutPopup ({
      account: this.#publicClientApp.getAccountByUsername(this.account.username)
    });
  }
  getTokenAuth() {
    acquireTokenParams.account = this.authData.account;
    // this.#publicClientApp.setActiveAccount(this.loginResponse.account);
    this.#publicClientApp.acquireTokenSilent(acquireTokenParams)
      .then(response => this.authData = response)
      .catch(err => {
        console.warn("silent token acquisition fails. acquiring token using popup");
        console.warn(err);
        // if(err instanceof msalBrowser.InteractionRequiredAuthError) {
          return this.#publicClientApp.acquireTokenPopup(this.acquireTokenParams)
            .then(response => this.authData = response)
            .catch(err => console.error(err));
        // }
      });
  }

}