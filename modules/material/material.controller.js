'use strict';

module.exports = function materialController(src) {
  const router = require('express').Router();

  const { new_w, _r, [':materialId_r']: materialId_r, edit_u } = src;
  router[new_w.method]('/new', new_w.middlewares, async function createMaterial(req, res, next) {
    try {
      const materialAdded = await new_w.service(req.body);
      res.status(201).json(materialAdded);
      
    } catch (err) {
      console.log(err)
      // throw MaterialModule.error.customError('Invalid data');
    }
  });
  router[_r.method](_r.relativePath, async function(req, res, next) {
    
    try {
      const materials = await _r.service();
      res.status(200).json(materials);
    } catch (err) {
      console.log(err);
    }
  });
  
  router[materialId_r.method](materialId_r.relativePath, async function(req, res, next) {
    const { materialId } = req.params;
    const material = await materialId_r.service({ code: materialId });
    res.status(200).json(material);
  });
  
  router.post(edit_u.relativePath, async (req, res) => {
    const materialUpdate = req.body;
    try {
      const set = { '$set': { ...materialUpdate } }
      const material = await edit_u.service(materialUpdate.code, set);
      
      if (!material) {
        res.status(204).send({});
      }
      return res.status(201).send({ ...material.toObject() });
          
    } catch (err) {
      console.error(err);
      res.status(400).send({ Error: 'Não foi possível processar esta solicitação' })
    }
  });
  
  return router;
}