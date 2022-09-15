'use strict';

class RouteFatory {
  #name; #method; #moduleLowerCaseName; #serviceName; #middlewaresNamesList;
  #service; #arn;
  #middlewares = [];
  #types = { post: 'w', get: 'r', put: 'u', delete: 'd' };
  constructor(name, method, middlewaresNamesList, serviceName) {
    this.#name = name; 
    this.#method = method; 
    this.#middlewaresNamesList = middlewaresNamesList;
    this.#serviceName = this.setServiceName(serviceName);
  }
  getDataAll() {
    return {
      adicionalsResources: this.adicionalsResources,
      name: this.#name,
      method: this.#method,
      moduleLowerCaseName: this.#moduleLowerCaseName,
      middlewares: this.#middlewares,
      service: this.#service,
      descriptiom: this.displayDescription,
      arn: this.#arn,
      error: this.error,
    }
  }
  get name() {
    return this.#name;
  }
  get method() {
    return this.#method;
  }
  get middlewaresNamesList() {
    return this.#middlewaresNamesList;
  }
  get middlewares() {
    return this.#middlewares;
  }
  get serviceName() {
    return this.#serviceName;
  }
  get service () {
    return this.#service.exec;
  }
  get serviceNameType () {
    return `${this.#serviceName}_${this.type}`;
  }
  get relativePath() {
    return `/${this.name}`;
  }
  get endpoint() {
    const relative = (this.name === '') ? '' : this.relativePath;
    return `/${this.#moduleLowerCaseName}${relative}`;
  }
  get moduleLowerCaseName() {
    return this.#moduleLowerCaseName;
  }
  get type() {
    return this.#types[this.method];
  }
  get srcName() {
    return `${this.name}_${this.type}`;
  }
  get displayDescription() {
    return this.#service.displayDescription;
  }
  get arn() {
    return this.#arn;
  }
  get adicionalsResources() {
    return this.#service.adicionalsResources;
  }
  setErrorFactory(generator) {
    this.error = (next, err) => {
      err.arn = this.arn;
      const e = generator(err);
      return next(e);
    }
  }
  setErrorFormat(creator) {
    this.createError = creator;
  }

  setModuleLowerCaseName(moduleLowerCaseName) {
    this.#moduleLowerCaseName = moduleLowerCaseName;
  }
  setServiceName(name) {
    if (name) {
      return name;
    }
    return this.name;
  }
  setService(service) {
    this.isNotEqualType(service.type);
    this.#service = service;
  }
  setMiddleware(middleware) {
    this.#middlewares.push(middleware(this));
  }
  setMadatoriesMiddlewares(middlewares) {
    middlewares.forEach(mid => {
      this.setMiddleware(mid);
    });
  }
  setApplicationResourceName(arn) {
    this.#arn = arn;
  }
  isArn(arn) {
    return arn === this.#arn;
  }
  isNotEqualType(serviceType) {
    if(serviceType !== this.type) {
      throw `Service type should be equal route type. service.type: <<${serviceType}>>, route.type: <<${this.type}>>`;
    }
  }

}

module.exports = RouteFatory;
