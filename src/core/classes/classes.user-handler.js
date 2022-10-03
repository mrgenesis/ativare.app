'use strict';

class UserHendler {
  #token;
  #adicionalsResources;
  constructor(token) {
    this.#token = token;
  }
  get id() {
    return this.#token.oid;
  }
  get role() {
    return this.#token.roles[0];
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
    return this.#token.roles[0] === 'Admin.Materiais_e_Orcamentos';
  }
  comumUserGrant(sourceArn, group) {
    if (!sourceArn) return false;
    if (!group) return false;
    if (!group[sourceArn]) return false;
    return true;
  }
  isGranted(src, groups) {
    if(this.isAdmin()) {
      this.#adicionalsResources = groups[this.role]['*'];
      return true;
    }
    if (this.comumUserGrant(src.arn, groups[this.role])) {
      this.#adicionalsResources = groups[this.role][src.arn];
      return true;
    }
    return false;
  }
  isGrantedResource(resourceName) {
    return this.isAdmin() || this.#adicionalsResources.indexOf(resourceName) > -1;
  }
}

module.exports = UserHendler;
