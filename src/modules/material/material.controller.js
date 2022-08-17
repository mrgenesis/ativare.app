'use strict';

module.exports = function materialController(resources) {
  const router = require('express').Router();
  const { new_w, _r, [':materialId_r']: materialId_r, edit_u } = resources;

  router[new_w.method](new_w.relativePath, new_w.middlewares, async function createMaterial(req, res, next) {
    try {
      const materialAdded = await new_w.service(req.body);
      res.status(201).json(materialAdded);
      
    } catch (err) {
      new_w.error(next, err);
    }
  });

  router[_r.method](_r.relativePath, async function(req, res, next) {

    try {
      const materials = await _r.service();
      res.status(200).json(materials);
    } catch (err) {
      _r.error(next, err);
    }
  });
  
  router[materialId_r.method](materialId_r.relativePath, async function(req, res, next) {
    const { materialId } = req.params;
    try {
      const material = await materialId_r.service({ code: materialId });
      res.status(200).json(material);
    } catch (err) {
      materialId.error(next, err);
    }
  });
  
  router.post(edit_u.relativePath, async (req, res, next) => {
    const materialUpdate = req.body;
    try {
      const set = { '$set': { ...materialUpdate } }
      const material = await edit_u.service(materialUpdate.code, set);
      
      if (!material) {
        res.status(204).send({});
      }
      return res.status(201).send({ ...material.toObject() });
          
    } catch (err) {
      edit_u.error(next, err);
    }
  });
  
  return router;
}