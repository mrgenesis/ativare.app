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
  static errorResolver({ dispatch, apiRequest }) {
    let msg = '';
    if(apiRequest.expectedResponse) {
      return !apiRequest.expectedResponse;
    }
    msg += (apiRequest.error && apiRequest.error.message) ? apiRequest.error.message : '';
    if (apiRequest.data) {
      try {
        apiRequest.data = JSON.parse(apiRequest.data);
        msg += `${(msg === '') ? '' : ' &'} ErrorId: ${apiRequest.data.errorId} - ${apiRequest.data.message}`;
        dispatch({ type: 'ERROR_REQUEST', payload: { message: msg } });
      } catch(e) {
        console.error(apiRequest.data, e);
        dispatch({ type: 'ERROR_REQUEST', payload: { message: `${msg} ${apiRequest.data}` } });
      }
    } else {
      dispatch({ type: 'ERROR_REQUEST', payload: { message: 'Erro desconhecido... & Não consegui converter o error em texto "response.text()" & ' + msg } });
    }
    return true;
  }
  getApiRequest(id) {
    return this.reqs[id];
  }
  createApiRequest(name, description) {
    const req = {
      name,
      description,
      id: idGenerator(),
      step: 'stopped',
      data: null,
      error: null,
      expectedResponse: null,
      retry: true
    }
    this.reqs[req.id] = req;
    return req.id;
  }
  preRequest() {    
    this.setAuthHeaders(this.authData.acquiredToken.accessToken);
  }

  resolver({ expectedCode, id, path, method, body, dataConverter = 'json', previousResolver }) {
    this.preRequest();
    this.reqs[id].step = 'running';
    this.reqs[id].sentBody = body;
    return new Promise((resolve) => {
      this.request(path, { method, body }).then(response => {
        this.reqs[id].response = response;
        this.reqs[id].expectedResponse = (expectedCode === response.status);
        if (this.reqs[id].expectedResponse) {
          return response[dataConverter]();
        }
        throw new Error(`Eu esperava o status ${expectedCode}, mas a API respondeu com o status ${response.status}.`);        
      })
      .then(data => {
        this.reqs[id].error = null;
        return data;
      })
      .catch(e => {
        this.reqs[id].error = e;
        console.error(e);
        return this.reqs[id].response.text();
      })
      .then(result => {
        this.reqs[id].data = result;
      })
      .finally(() => {
        if (this.reqs[id].response && this.reqs[id].response.status === 401 && this.reqs[id].retry) {
          console.warn('A resposta da API foi com status 401. Vou tentar renovar o token e tentar mais uma vez...');
          this.reqs[id].retry = false;
          return this.acquireToken().then(() => {
            return this.resolver({ expectedCode, id, path, method, body, dataConverter, previousResolver: resolve });
          })
        }
        console.log('finally'+id, this.reqs)
        this.reqs[id].step = 'done';
        typeof previousResolver === 'function' ? previousResolver(id) : resolve(id);
      });
    });
  }

  createBudget({ body, id = this.createApiRequest('createBudget', 'criar um novo orçamento') } = {}) {
    return this.resolver({ expectedCode: 201, body, id, method: 'post', path: '/budget/create' });
  }
  getMaterials({ id = this.createApiRequest('getMaterials', 'obter uma lista de materiais') } = {}) {
    return this.resolver({ expectedCode: 200, id, method: 'get', path: '/material' });
  }
  getBudgets({ id = this.createApiRequest('getBudgets', 'obter uma lista de orçamentos') } = {}) {
    return this.resolver({ expectedCode: 200, id, method: 'get', path: '/budget' });
  }
  addNewMaterial({ id = this.createApiRequest('addNewMaterial', 'cadastrar um novo material'), material } = {}) {
    this.addHeaders("Content-Type", "application/json");
    return this.resolver({ expectedCode: 201, id, path: '/material/new', method: 'post', body: material });
  }
  getMaterialByCode({ code, id = this.createApiRequest('getMaterialByCode', 'obter um mateiral através do código') } = {}) {
    return this.resolver({ expectedCode: 200, id, method: 'get', path: `/material/${code}` });
  }
  updateMaterial({ id = this.createApiRequest('updateMaterial', 'atualizar um mateiral através do código'), updatedMaterial } = {}) {
    this.addHeaders("Content-Type", "application/json");
    return this.resolver({ expectedCode: 200, id, path: `/material/edit`, method: 'post', body: updatedMaterial });
  }
}
