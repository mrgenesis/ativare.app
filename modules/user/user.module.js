
'use strict';

function UserModule() {}
UserModule.type = 'route';

UserModule.prototype.controller = require('./user.controller');
UserModule.prototype.middleware = require('./user.middleware');
UserModule.prototype.service = require('./user.service');
UserModule.prototype.model = require('./user.model');

module.exports = UserModule;
