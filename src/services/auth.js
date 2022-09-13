import { Apis } from "./apis";
import * as msalBrowser from '@azure/msal-browser';
import { msalAadClientConfig, acquireTokenParams } from '../config/aad';

export default class Auth extends Apis {
  publicClientApp;
  authData = {};
  constructor() {
    super();
    this.publicClientApp = new msalBrowser.PublicClientApplication(msalAadClientConfig);
  }
  singIn() {
    return new Promise((resolve, reject) => {
      this.publicClientApp.loginPopup({ scopes: ["openid", "profile"] })
        .then(response => {
          this.authData.singIn = response;
          this.acquireToken()
          .then(data => {
            this.authData.acquiredToken = data;
            resolve(this.authData);
          })
          .catch(e => console.log('Não foi possível recuperar um token', e));
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });

  }
  signOut() {
    this.publicClientApp.logoutPopup ({
      account: this.publicClientApp.getAccountByUsername(this.account.username)
    });
  }

  getAcquireTokenParams() {
    const account = this.publicClientApp.getAccountByUsername(this.authData.singIn.account.username);
    return { ...acquireTokenParams, account }
  }
  acquireToken() {
    return new Promise((resove, reject) => {
      console.warn("Recuperando token de forma silenciosa...");
      this.publicClientApp.acquireTokenSilent(this.getAcquireTokenParams())
      .then(data => {
        this.authData.acquiredToken = data;
        resove(data);
      })
      .catch(err => {
        console.warn("A requisição silenciosa falhou. Abrindo o popup...");
        if(err instanceof this.publicClientApp.InteractionRequiredAuthError) {
          return this.publicClientApp.acquireTokenPopup(this.getAcquireTokenParams())
          .then(data => {
            this.authData.acquiredToken = data;
            resove(data);
          })
          .catch(reject);
        }
        reject(err);
      });
    });
  }

}