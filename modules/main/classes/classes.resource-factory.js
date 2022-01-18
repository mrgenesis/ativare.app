'use strict';

class ResourceFactory {
  #localName;
  #src = {};
  constructor({ ...props } = {}){
    this.#src.arn = `${props.name}_${props.service.name}@${props.moduleName}_${props.type.toLowerCase()}`;
    this.#localName = `${props.name}_${props.type.toLowerCase()}`;
    this.#src.name = `${props.name}`;
    this.#src.method = `${props.method}`;
    this.#src.service = props.service.exec;
    this.#src.displayDescription = props.service.displayDescription;
    this.#src.relativePath = `/${props.name}`;
    this.#src.endpoint = `/${props.moduleName.toLowerCase()}${this.configurePath(props.name)}`;
  }
  getTest() { // TODO: remove
    console.log(this.#src);
  }
  configurePath(name) {
    return (name === '') ? '' : `/${name}`;
  }
  getData() {
    return this.#src.data;
  }
  middlewareSet({ propertyName, data }) {
    this.#src[propertyName] = data;
  }
  get(propertyName) {
    return this.#src[propertyName];
  }
  getLocalName() {
    return this.#localName;
  }
}

module.exports = ResourceFactory;
