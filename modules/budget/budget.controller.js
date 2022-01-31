'use strict';

module.exports = function budgetController(src) {
  const router = require('express').Router();

  // console.log('budgetId_r', budgetId_r, budgetId_r.name)
  
  const { create_w, _r, [':budgetId_r']: budgetId_r } = src;
  router[create_w.method](create_w.relativePath, create_w.middlewares, async (req, res, next) => {
    try { 
      const newBudgetId = await create_w.service({
        ...req.body,
        ownId: req.userId
      });
      res.status(201).json({ _id: newBudgetId });
    } catch(err) {
      // _w.error(err, next);
      console.error({ Error: err });
    }
  });
  
  router[_r.method](_r.relativePath, _r.middlewares, async (req, res, next) => {
    const newBudgetId = await _r.service({});
    try {
      res.status(200).json(newBudgetId);
    } catch(err) {
    }
  });
  router[budgetId_r.method](budgetId_r.relativePath, budgetId_r.middlewares, async (req, res, next) => {
    try {
      const { budgetId: budgetCode } = req.params;
      const budget = await budgetId_r.service(budgetCode);
      // console.log(budget)
      res.status(200).json({...budget});
    } catch(err) {
      console.log(err)
      //next(budgetModule.budgetError().next(err));
    }
  });
  return router;
}
