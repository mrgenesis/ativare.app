const supertest = require("supertest");
const getApp = require('../../../../../app');
const Fixeture = require('../fixeture');
let app, agent;

describe('', ()=> {
  describe('Fluxo de login no AAD', ()=> {
    beforeAll(() => {
      return getApp().then((a) => {
        app = a;
        agent = supertest.agent(app);
        return;
      });
    });
    test('POST /user/authenticate - deve gerar o link para fazer o login no AAD', () => {
      return agent.get('/user/authenticate')
        // .send(Fixeture.authenticate.body)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('urlAuth');
        });
    });
  });
});