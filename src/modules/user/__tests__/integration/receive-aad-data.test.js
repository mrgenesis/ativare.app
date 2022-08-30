const supertest = require("supertest");
const getApp = require('../../../../../app');
const Fixeture = require('../fixeture');
let agent;

describe('User', ()=> {
  describe('receive-aad-data', ()=> {
    beforeAll(() => {
      return getApp().then((app) => {
        agent = supertest.agent(app);
        return;
      });
    });
    test('POST /user/receive-aad-data - Se a propriedade "state" não estiver definida gera um erro', () => {
      return agent.post('/user/receive-aad-data')
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });
    test('POST /user/receive-aad-data - Se a propriedade "state" não estiver num formato válido gera um erro', () => {
      return agent.post('/user/receive-aad-data')
        .send(Fixeture.receiveAadData.body.stateMalformated)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });
    test('POST /user/receive-aad-data - Se a propriedade "state.csrfToken" não estiver definida gera um erro', () => {
      return agent.post('/user/receive-aad-data')
        .send(Fixeture.receiveAadData.body.withoutCsrfToken)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });
  });
});