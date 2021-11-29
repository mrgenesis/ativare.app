'use strict';

function MaterialModule() {};

MaterialModule.type = 'route';

MaterialModule.prototype.controller = require('./material.controller');
MaterialModule.prototype.materialMiddleware = require('./material.middleware');
MaterialModule.prototype.materialService = require('./material.service');
MaterialModule.prototype.model = require('./material.model');

module.exports = MaterialModule;
