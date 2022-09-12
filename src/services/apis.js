
export class Apis {
  #urlBase; #path;
  #options = {
    method: 'get',
    headers: new Headers()
  };
  setAuthHeaders(token) {
    this.#options.headers.append('Authorization', token);
  }
  set path(path) { this.#path = path.replace(/^\//, ''); }
  get path() { return this.#path; }
  set urlBase(baseUrl) { this.#urlBase = baseUrl.replace(/\/$/, ''); }
  get urlBase() { return this.#urlBase; }
  set options(opt) {
    this.#options = {
      ...this.#options,
      ...opt
    };
  }
  secureStringifyOfBody(body) {
    if(typeof body === 'string') {
      return body;
    }
    try {
      return JSON.stringify(body);
    } catch (e) {
      console.warn('secureStringifyOfBody', e);
      return '{"secureStringifyOfBody": "Error"}';
    }
  }
  endpoint(path) {
    return `${this.urlBase}/${path}`;
  }
  set method(method) {
    this.#options.method = method;
  }
  request(path = this.#path, options = {}) {
    return new Promise((resolve, reject) => {
      window.fetch(this.endpoint(path), { ...this.#options, ...options })
      .then(resolve)
      .catch(reject);
    });
  }
}
