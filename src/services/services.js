import Auth from "./auth";
import { apiConfig } from "../config/aad";
import { idGenerator } from '../commun';

export default class Services extends Auth {
  authData = {};
  urlBase = apiConfig.urlBase;
  reqs = {};
  constructor(authData = {}) {
    super();
    this.authData = authData;
  }
  getApiRequest(id) {
    return this.reqs[id];
  }
  createApiRequest(name, description) {
    const req = {
      name,
      description,
      id: idGenerator(),
      stage: 'stopped',
      data: null,
      error: null,
      retry: true
    }
    this.reqs[req.id] = req;
    return req.id;
  }
  resolver(id, payload, converteIn = 'json') {
    return new Promise((resolve) => {
      this.reqs[id].step = 'running';
      payload.then(data => this.reqs[id].data = data)
      .then(res => {
        this.reqs[id].response = res;
        return res[converteIn]();
      })
      .catch(e => this.reqs[id].error = e)
      .finally(() => {
        if (this.reqs[id].error && this.reqs[id].retry) {
          this.reqs[id].retry = false;
          this.acquireToken().then(() => {
            return this[this.reqs[id].name](id);
          })
        }
        this.reqs[id].step = 'done';
        resolve(id);
      });
    });
  }

  getMaterials(id = this.createApiRequest('getMaterials', 'obter uma lista de materiais')) {
    this.setAuthHeaders(this.authData.acquiredToken.accessToken);
    return this.resolver(id, this.request('/material', { method: 'get' }));
  }
}
