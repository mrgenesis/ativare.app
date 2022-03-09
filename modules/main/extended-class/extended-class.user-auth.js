'use strict';
const setDependece = Auth => class UserAuth extends Auth {
  #src; #brokeArn; #group; #data = {};
  constructor() {
    super();
    this.#data.loginStatus = false;
  }
  get user() {
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
  setUserData(userData) {
    this.#data.user = userData;
    this.setLoginStatus(true);
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
    if (!resource) {
      throw this.#src.createError(`O recurso com nome "${this.#brokeArn.resourceTypedName}" não existe.`, 400);
    }

    const permissionsExplicitStatus = {};
    const basicAction = this.#brokeArn.basicAction;
    isAllowed = (resource.indexOf(basicAction) > (-1));

    this.#brokeArn.permissions.forEach(permissionName => {
      const action = `${basicAction}+${permissionName}`;
      if ((resource.indexOf(action) > (-1))) {
        permissionsExplicitStatus[permissionName] = true;
        isAllowed = true;
        return;
      }      
      permissionsExplicitStatus[permissionName] = false;
    });
    this.addData({ propertyName: 'allowed', value: permissionsExplicitStatus });
    return isAllowed;
  }
  getProperty(property) {
    return this.#data[property];
  }
  
  getGourp(name) { // TODO: este objeto retonado nesta função deve ser amazenado no banco de dados e ficar disponível em cache escalavel
    const groups = [
      {
        name: 'admin',
        users: ['U1'],
        fullAccess: 'allowed'
      },
      {
        name: 'arquiteto',
        users: ['U2'],
        resources: {
          Budget_r: [':budgetId_findByCode+basic'],
          Product_r: ['automation_find'],
        }
      },
    ];
    return groups.find(group => group.name === name);
  }
}

setDependece.dependece = 'Auth';
module.exports = setDependece;
