'use strict';

class UserHendler {
  #token; #context;
  #adicionalsResources;
  constructor(token, context) {
    this.#token = token;
    this.#context = context;
  }
  get id() {
    return this.#token.oid;
  }
  get role() {
    if (this.#token.roles) {
      return this.#token.roles[0];      
    }
    return '';
  }
  get adicionalsResources() {
    return [ ...this.#adicionalsResources ];
  }
  getUserData() {
    return {
      email: this.#token.preferred_username,
      name: this.#token.name,
      code: this.#token.oid
    }
  }
  isId(id) {
    return id === this.id;
  }
  isAdmin() {
    return this.role === this.#context.appConfig.AdminGroupName;
  }
  comumUserGrant(sourceArn, group) {
    if (!sourceArn) return false;
    if (!group) return false;
    if (!group[sourceArn]) return false;
    return true;
  }
  isGranted(src, groups) {
    if(this.isAdmin()) {
      this.#adicionalsResources = groups?.[this.role]?.['*'];
      if (this.#adicionalsResources) {
        return true;
      }
    }
    if (this.comumUserGrant(src.arn, groups[this.role])) {
      this.#adicionalsResources = groups[this.role][src.arn];
      if (this.#adicionalsResources) {
        return true;
      }
    }
    return false;
  }
  isGrantedResource(resourceName) {
    return this.isAdmin() || this.#adicionalsResources.indexOf(resourceName) > -1;
  }
}

module.exports = UserHendler;
