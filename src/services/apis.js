
export class Apis {
  #urlBase; #path = '/';
  #options = {
    method: 'get',
    headers: new Headers()
  };
  setAuthHeaders(token, type = 'Bearer') {
    this.#options.headers.delete('Authorization');
    this.#options.headers.append('Authorization', `${type} ${token}`);
  }
  get path() { return this.#path; }
  get urlBase() { return this.#urlBase; }
  set path(path) { this.#path = this.removeSlash(path); }
  set urlBase(baseUrl) { this.#urlBase = this.removeSlash(baseUrl, 'end'); }
  set options(opt) {
    this.#options = {
      ...this.#options,
      ...opt
    };
  }
  removeSlash(str, position = 'start') {
    const remover = { start: s => s.replace(/^\//, ''), end: s => s.replace(/\/$/, ''), };
    return remover[position](str);
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
    const mergedOptions = { ...this.#options, ...options };
    path = this.removeSlash(path);
    return new Promise((resolve, reject) => {
      window.fetch(this.endpoint(path), mergedOptions)
      .then(resolve)
      .catch(reject);
    });
  }
}
