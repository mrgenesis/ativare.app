'use strict';

function BudgetModule() {
  const report = {};
  this.setReport = function setReport(property, data) {
    report[property] = data;
  }
  this.getReport = function getReport() {
    return report;
  }
}
BudgetModule.type = 'route';

BudgetModule.prototype.controller = require('./budget.controller');
BudgetModule.prototype.service = require('./budget.service');
BudgetModule.prototype.middleware = function(){}
BudgetModule.prototype.model = require('./budget.model');
BudgetModule.prototype.materialModel = require('../material/material.module').materialModel;

module.exports = BudgetModule;
