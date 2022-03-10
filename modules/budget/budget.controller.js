'use strict';

module.exports = function budgetController(resources) {
  const router = require('express').Router();
  const { create_w, _r, [':budgetId_r']: budgetId_r } = resources;

  router[create_w.method](create_w.relativePath, create_w.middlewares, async (req, res, next) => {
    try { 
      const newBudgetId = await create_w.service(req.userAuth.getProperty('budget'));
      res.status(201).json({ _id: newBudgetId });
    } catch(err) {
      create_w.error(next, err);
    }
  });
  
  router[_r.method](_r.relativePath, _r.middlewares, async (req, res, next) => {
    const newBudgetId = await _r.service({});
    try {
      res.status(200).json(newBudgetId);
    } catch(err) {
      _r.error(next, err);
    }
  });
  router[budgetId_r.method](budgetId_r.relativePath, budgetId_r.middlewares, async (req, res, next) => {
    try {
      const { budgetId: budgetCode } = req.params;
      const budget = await budgetId_r.service(budgetCode, req.userAuth);
      res.status(200).json({...budget});
    } catch(err) {
      budgetId_r.error(next, err);
    }
  });

  return router;
}
