'use strict';

module.exports = function productController(app) {
  const router = require('express').Router();
  const ProductMiddleware = this.middleware();
  const ProductService = this.service(); 

  router.get('/', async (req, res) => {
    try {
      let product = await ProductService.find({});
      
      res.status(200).send([
        ...product
      ]);
    } catch (error) {
      console.log('error', error)
      res.status(500).send('Erro para processar esta solicitação');
    }  
  });
  router.post('/new', async (req, res) => {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).send({
        ...product
      });
      
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
      const product = await ProductService.update(codeProperty, set);

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

  router.get('/automation', async (req, res) => {
    try {
      const automationItems = await ProductService.find({
        category: "Automação"
      });
      res.status(200).send([...automationItems]);

    } catch (error) {
      res.status(500).send('Erro para processar esta solicitação');
    }
  });

  router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await ProductService.findOne({ code: productId });
      res.status(200).send({
        ...product.toObject()
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
  });
  
  /*
  router.get('/automation', async (req, res) => {
    try {
      const automationItems = await ProductService.find({
        category: "Automação"
      });
      res.status(200).send([...automationItems]);

    } catch (error) {
      res.status(500).send('Erro para processar esta solicitação');
    }
  });
  
  
  */

  app.use('/product', router);
}
 


