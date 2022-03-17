'use strict';
const setDependece = Auth => class UserAuth extends Auth {
  #context; #src; #brokeArn; #group; #data = {};
  constructor(context) {
    super();
    this.#context = context;
    this.#data.loginStatus = false;
  }
  set user(userData) {
    this.#data.user = userData;
    this.setLoginStatus(true);
  }
  get userData() {
    return this.#data.user;    
  }
  set src(src) {
    this.#src = src;
    this.toBrokeArn(src.arn);
  }
  toBrokeArn(arn) {
    this.#brokeArn = {
      resourceTypedName: this.getResourceTypedName(arn),
      ...this.getBasicActionAndPermissions(arn),
    }
  }
  getResourceTypedName(arn) {
    const start = (arn.indexOf('@') + 1);
    return arn.slice(start, arn.length);
  }
  getBasicActionAndPermissions(arn) {
    const name = arn.slice(0, arn.indexOf('@'));
    const basicActionAndPermissions = name.split('+');
    const basicAction = basicActionAndPermissions.shift();
    return { basicAction, permissions: basicActionAndPermissions };
  }
  analyzeAccess() {
    this.#group = this.getGourp(this.#data.user.group);
    this.throwErrorIfgroupNotExists(this.#group);
    this.throwErrorIfUserNotFoundInGroup(this.#group);
    this.throwErrorIfUserIsNotAllowed();
  }
  throwErrorIfgroupNotExists(groupResultSearch) {
    if (!groupResultSearch) {
      throw this.#src.createError(`O grupo com nome "${this.#data.user.group}" não existe.`, 400);
    }
  }
  throwErrorIfUserNotFoundInGroup(groupResultSearch) { 
    if (groupResultSearch.users.indexOf(this.#data.user.code) === -1) {
      throw this.#src.createError(`O usuário "${this.#data.user.code}" está dizendo que pertence não pertence ao grupo ${this.#data.user.group}, mas seu nome não consta na lista.`, 400);
    }
  }
  throwErrorIfUserIsNotAllowed() {
    if (this.isUserAllowed()) {
      return;
    }
    throw this.#src.createError(`Acesso negado.`, 403);
  }
  isUserAllowed() {
    if(this.#group.fullAccess === 'allowed') {
      return this.fullAccess();
    }
    return this.getAllowedAccess();
  }
  fullAccess() {
    const permissionsExplicitStatus = {};
    this.#brokeArn.permissions.forEach(permissionName => {
      permissionsExplicitStatus[permissionName] = true;    
    });
    this.addData({ propertyName: 'allowed', value: permissionsExplicitStatus });
    return true;
  }
  addData({ propertyName, value }) {
    this.#data[propertyName] = value;
  }
  getAllowedAccess() {
    let isAllowed = false;
    const resource = this.#group.resources[this.#brokeArn.resourceTypedName];
    if (Array.isArray(resource)) {
      const matchOneItem = a => (resource.indexOf(a) > (-1));
      
      const permissionsExplicitStatus = {};
      const basicAction = this.#brokeArn.basicAction;
      isAllowed = matchOneItem(basicAction);
      
      this.#brokeArn.permissions.forEach(permissionName => {
        const action = `${basicAction}+${permissionName}`;
        if(matchOneItem(action)) {
          permissionsExplicitStatus[permissionName] = true;
          isAllowed = true;
          return;
        }      
        permissionsExplicitStatus[permissionName] = false;
      });
      this.addData({ propertyName: 'allowed', value: permissionsExplicitStatus });
      return isAllowed;
    }
    throw this.#src.createError(`O seu usuário não tem permissão para acessar o recurso "${this.#brokeArn.resourceTypedName}".`, 400);
  }
  getProperty(property) {
    return this.#data[property];
  }
  
  getGourp(name) {
    return this.#context.permissionGroups.find(group => group.name === name);
  }
}

setDependece.dependece = 'Auth';
module.exports = setDependece;
