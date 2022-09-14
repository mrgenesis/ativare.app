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
  preRequest() {
    this.setAuthHeaders(this.authData.acquiredToken.accessToken);
  }

  resolver({id, path, method, body, dataConverter = 'json'}) {
    this.preRequest();
    const payload = this.request(path, { method, body });
    this.reqs[id].step = 'running';
    this.reqs[id].sentBody = body;
    return new Promise((resolve) => {
      payload.then(response => {
        this.reqs[id].response = response;
        try {
          return response[dataConverter]();
        } catch(e) {
          console.error(`Tentei converter o dado recebido, mas não foi possível. dataConverter=${dataConverter}`);
          throw e;
        }
      })
      .then(data => {
        this.reqs[id].data = data;
      })
      .catch(e => this.reqs[id].error = e)
      .finally(() => {
        if (this.reqs[id].error && this.reqs[id].retry) {
          this.reqs[id].retry = false;
          this.acquireToken().then(() => {
            return this[this.reqs[id].name]({id, body: this.reqs[id].sentBody });
          })
        }
        this.reqs[id].step = 'done';
        resolve(id);
      });
    });
  }

  createBudget({ body, id = this.createApiRequest('createBudget', 'criar um novo orçamento') } = {}) {
    return this.resolver({ body, id, method: 'post', path: '/budget/create' });
  }
  getMaterials({ id = this.createApiRequest('getMaterials', 'obter uma lista de materiais') } = {}) {
    return this.resolver({id, method: 'get', path: '/material' });
  }
}
