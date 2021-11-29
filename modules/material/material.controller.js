'use strict';

module.exports = function materialController(app) {
  const MaterialModule = this;
  const router = require('express').Router();
  const MaterialMiddleware = this.materialMiddleware();
  const MaterialService = this.materialService(); 
  const that = this;

  router.post('/new', MaterialMiddleware.addMaterial, async function createMaterial(req, res, next) {
    try {
      const materialAdded = await MaterialService.create(req.body);
      res.status(201).json(materialAdded);
      
    } catch (err) {
      throw MaterialModule.error.customError('Invalid data');
    }
  });

  router.get('/', async function(req, res, next) {
    const materials = await MaterialService.findAll();
    res.status(200).json(materials);
  });

  router.get('/:materialId', async function(req, res, next) {
    const { materialId } = req.params;
    const material = await MaterialService.findOne({ code: materialId });
    res.status(200).json(material);
  });

  router.post('/edit', async (req, res) => {
    const materialUpdate = req.body;
    try {
      const set = { '$set': { name: materialUpdate.name, limit: materialUpdate.limit, unitPrice: materialUpdate.unitPrice } }
      const material = await MaterialService.findByCodeAndUpdate(materialUpdate.code, set);
      
      if (!material) {
        res.status(204).send({});
      }
      return res.status(201).send({ ...material.toObject() });
          
    } catch (err) {
      console.error(err);
      res.status(400).send({ Error: 'Não foi possível processar esta solicitação' })
    }
  });

  app.use('/material', router);
}