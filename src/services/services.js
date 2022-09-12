import { Apis } from "./apis";
import { apiConfig } from "../config/aad";

export default class Services extends Apis {
  authData = {};
  urlBase = apiConfig.urlBase;
  constructor() {
    super();
  }

  budgetCreate(budget) {
    // return new Promise((resolve, reject) => {});
    this.setAuthHeaders(this.authData.accessToken);
    return this.request('bubget/new', { method: 'post', body: this.secureStringifyOfBody(budget) })
  }
}
