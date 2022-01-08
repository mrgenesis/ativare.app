'use strict';

class AccessAnalyzer {
  #src = {};
  #user = {};
  #groups = {};
  constructor({ src, user, groups }) {
    this.#src = src;
    this.#user = user;
    this.#groups = groups;
  }
  getAppResourceName() {
    return this.#src.arn;
  }
  getAppResourceType() {
    return this.#src.service.type;
  }
  getGroupsOf() {
    return this.#groups.search(this.#user);
  }
}

module.exports = AccessAnalyzer;
