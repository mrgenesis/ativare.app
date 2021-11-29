jest.setTimeout(20000)
describe('MaterialController', function() {

  const request = require('supertest');
  const app = require('../../../../app');
  const NecessaryModule = app.get('NecessaryModule');
  const { UtilsModule } = NecessaryModule;
  const MaterialModule = require('../../material.module');
  const MaterialModel = MaterialModule.materialModel();
  const Fixtures = require('../fixtures/fixtures');


  describe('POST /material/new',  function () {
    afterEach(function () {
      //return MaterialModel.deleteMany();
    }); 
    it('Save a new material', function (done) {
      const { newMaterial } = Fixtures.material;
      request(app)
      .post('/material/new')
      .send(newMaterial)
      .expect(201)
      .then(async res => {
        const createdMaterial = await MaterialModel.findOne({ name: newMaterial.name });
        const { body } = res;
        expect(UtilsModule.deepTypeof(createdMaterial)).toBe('object');
        expect(createdMaterial).toHaveProperty('name', body.name);
        expect(createdMaterial).toHaveProperty('unitPrice', body.unitPrice);
        expect(createdMaterial).toHaveProperty('rule', body.rule);
        done();
      })
    })
  });

});
