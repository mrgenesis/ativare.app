'use strict';

module.exports = function productController(resources) {
  const router = require('express').Router();
  const { _r, new_w, automation_r, edit_u, [':productId_r']: productId_r } = resources;

  router[_r.method](_r.relativePath, async (req, res, next) => {
    try {
      let product = await _r.service({});
      
      res.status(200).send([
        ...product
      ]);
    } catch (error) {
      _r.error(next, error);
    }  
  });
  router[new_w.method](new_w.relativePath, async (req, res, next) => {
    try {
      const product = await new_w.service(req.body);
      res.status(201).send({
        ...product
      });
      
    } catch (error) {
      new_w.error(next, error);
    }
    
  });
  router[automation_r.method](automation_r.relativePath, async (req, res, next) => {
    try {
      const automationItems = await automation_r.service({
        category: "Automação"
      });
      res.status(200).send([...automationItems]);
  
    } catch (error) {
      new_w.error(next, error);
    }
  });
  
  router.post('/edit', async (req, res) => {
    const productUpdate = req.body;
    try {
      if (!productUpdate.code) {
        throw new Error('A propriedade code não foi informada.');
      }
      const codeProperty = { code: productUpdate.code };
      const set = { '$set': { name: productUpdate.name, description: productUpdate.description } }
      const product = await edit_u.service(codeProperty, set);

      if (!product) {
        res.status(204).send({});
      }
      return res.status(201).send({
        ...product.toObject()
      });

    } catch (err) {
      edit_u.error(next, err);
    }
  });
  
  router[productId_r.method](productId_r.relativePath, async (req, res, next) => {
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
 