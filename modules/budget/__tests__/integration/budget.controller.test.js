jest.setTimeout(500000)
describe('BudgetController', function() {

  const request = require('supertest');
  const app = require('../../../../app');
  const NecessaryModule = app.get('NecessaryModule');
  const { UtilsModule } = NecessaryModule;
  const mongoose = require('mongoose');
  const BudgetModule = require('../../budget.module');
  const BudgetModel = BudgetModule.budgetModel();
  const Fixture = require('../fixtures/fixtures')
  const aux = {};


  describe('POST /budget/create',  function () {
    beforeEach(function () {
      
    });
    afterEach(function (done) {
      const idDel = aux.create?.res?.body?._id;
      idDel ? BudgetModel.deleteOne({ _id: idDel }) : '';
      console.log('idDel:',idDel)
    }); 
    it('Get budget by code', function (done) {
      request(app)
      .post('/budget/create')
      .send(Fixture.budget.newBudget)
      .expect(201)
      .then(async res => {
        aux.create = { res };
        expect(aux.create.res.body).toHaveProperty('_id');
        done();
      })
    })
  });

});
