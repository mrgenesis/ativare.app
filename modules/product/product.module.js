'usre strict';

function ProductModule() {}
ProductModule.type = 'route';

ProductModule.prototype.controller = require('./product.controller');
ProductModule.prototype.middleware = require('./product.middleware');
ProductModule.prototype.model = require('./product.model');
ProductModule.prototype.service = require('./product.service');

module.exports = ProductModule;

