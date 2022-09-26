'use strict';

module.exports = function productController(resources) {
  const router = require('express').Router();
  const { _r, new_w, automation_r, edit_u, [':productId_r']: productId_r, ['find-by_r']: findBy_r } = resources;

  router[_r.method](_r.relativePath, _r.middlewares, async (req, res, next) => {
    try {
      let product = await _r.service({});
      
      res.status(200).send([
        ...product
      ]);
    } catch (error) {
      _r.error(next, error);
    }  
  });
  router[new_w.method](new_w.relativePath, new_w.middlewares, async (req, res, next) => {
    try {
      const product = await new_w.service(req.body);
      res.status(201).send({
        ...product
      });
      
    } catch (error) {
      new_w.error(next, error);
    }
    
  });
  router[findBy_r.method](findBy_r.relativePath, findBy_r.middlewares, async (req, res, next) => {
    const { key, value } = req.query;
    try {
      const automationItems = await findBy_r.service({
        [key]: value
      });
      res.status(200).send([...automationItems]);
  
    } catch (error) {
      new_w.error(next, error);
    }
  });
  router[automation_r.method](automation_r.relativePath, automation_r.middlewares, async (req, res, next) => {
    try {
      const automationItems = await automation_r.service({
        category: "Automação"
      });
      res.status(200).send([...automationItems]);
  
    } catch (error) {
      new_w.error(next, error);
    }
  });
  
  
  router[edit_u.method](edit_u.relativePath, edit_u.middlewares, async (req, res) => {
    const productUpdate = req.body;
    try {
      const codeProperty = { code: productUpdate.code };
      const set = { '$set': { name: productUpdate.name, description: productUpdate.description } }
      const product = await edit_u.service(codeProperty, set);
      
      return res.status(200).send({
        ...product.toObject()
      });

    } catch (err) {
      edit_u.error(next, err);
    }
  });
  
  router[productId_r.method](productId_r.relativePath, productId_r.middlewares, async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await productId_r.service({ code: productId });
      res.status(200).send({
        ...product.toObject()
      });
    } catch (error) {
      productId_r.error(next, error);
    }
  });

  return router;
}
 