'use strict';

class RouteFatory {
  #name; #method; #moduleLowerCaseName; #serviceName; #middlewaresNamesList;
  #service; #arn;
  #middlewares = [];
  #data = {};
  #types = { post: 'w', get: 'r', put: 'u', delete: 'd' };
  constructor(name, method, middlewaresNamesList, serviceName) {
    this.#name = name; 
    this.#method = method; 
    this.#middlewaresNamesList = middlewaresNamesList;
    this.#serviceName = this.setServiceName(serviceName);
  }
  getDataAll() {
    return {
      name: this.#name,
      method: this.#method,
      moduleLowerCaseName: this.#moduleLowerCaseName,
      serviceName: this.#serviceName,
      middlewaresNamesList: this.#middlewaresNamesList,
      middlewares: this.#middlewares,
      data: this.#data,
      arn: this.#arn,
      types: this.#types,
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
  get data() {
    return this.#data;
  }
  setErrorFactory(generator) {
    this.error = (next, err) => {
      const e = generator(err.message, err.statusCode, this.arn);
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
  setApplicationResourceName(arn) {
    this.#arn = arn;
  }
  isArn(arn) {
    return arn === this.#arn;
  }
  addData({ propertyName, value }) {
    this.#data[propertyName] = value;
  }
  isNotEqualType(serviceType) {
    if(serviceType !== this.type) {
      throw `Service type should be equal route type. service.type: <<${serviceType}>>, route.type: <<${this.type}>>`;
    }
  }

}

module.exports = RouteFatory;
