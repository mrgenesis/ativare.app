'use strict';

module.exports = function budgetController(app) {
  const budgetModule = this;
  const router = require('express').Router();
  console.log('[budgetController]: Controller executando');
  const BudgetModel = budgetModule.model();
  const BudgetService = budgetModule.service(BudgetModel);
  router.post('/create', async (req, res, next) => {
    try {
      const newBudgetId = await BudgetService.create({
        ...req.body,
        ownId: req.userId
      });
      res.status(201).json({ _id: newBudgetId });
    } catch(err) {
      console.error({ Error: err });
    }
  });
  
  router.get('/', async (req, res, next) => {
    const newBudgetId = await BudgetService.find({});
    try {
      res.status(200).json(newBudgetId);
    } catch(err) {
    }
  });
  router.get('/:budgetId', async (req, res, next) => {
    try {
      const { budgetId: budgetCode } = req.params;
      const budget = await BudgetService.findByCode(budgetCode);
      console.log('---------------', budgetCode)
      console.log('---------------', budget)
      res.status(200).json({...budget});
    } catch(err) {
      //next(budgetModule.budgetError().next(err));
    }
  });
  router.get('/public/:budgetId', async (req, res, next) => {
    try {
      const { budgetId } = req.params;
      const budget = await BudgetService.findByICode(budgetId);
      res.status(200).json(budget);
    } catch(err) {
      //next(budgetModule.budgetError().next(err));
    }
  });
  router.put('/', async (req, res, next) => {
    try {
      res.status(200).json({});
    } catch(err) {
    }
  });
  router.delete('/', async (req, res, next) => {
    try {
      res.status(200).json({});
    } catch(err) {
    }
  });

  app.use('/budget', router);
}