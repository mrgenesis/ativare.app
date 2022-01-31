'use strict';

module.exports = function productController(src) {
  const router = require('express').Router();

  const { _r, new_w, automation_r, edit_u, [':productId_r']: productId_r } = src;
  
  router[_r.method](_r.relativePath, async (req, res) => {
    try {
      let product = await _r.service({});
      
      res.status(200).send([
        ...product
      ]);
    } catch (error) {
      console.log('error', error)
      res.status(500).send('Erro para processar esta solicitação');
    }  
  });
  router[new_w.method](new_w.relativePath, async (req, res) => {
    try {
      const product = await new_w.service(req.body);
      res.status(201).send({
        ...product
      });
      
    } catch (error) {
      res.status(500).send('Erro para processar esta solicitação');
    }
    
  });
  router[automation_r.method](automation_r.relativePath, async (req, res) => {
    try {
      const automationItems = await automation_r.service({
        category: "Automação"
      });
      res.status(200).send([...automationItems]);
  
    } catch (error) {
      res.status(500).send('Erro para processar esta solicitação');
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
      console.error(err);
      res.status(400).send({ Error: 'Não foi possível processar esta solicitação' })
    }
  });
  
  router[productId_r.method]('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productId_r.service({ code: productId });
      res.status(200).send({
        ...product.toObject()
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
  });

  return router;
}
 


