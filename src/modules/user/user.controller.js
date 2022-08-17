'use strict';
const router = require('express').Router();

module.exports = function userController(resources) {
  const { authenticate_w } = resources;  
  
  router[authenticate_w.method](authenticate_w.relativePath, async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await authenticate_w.service(email, password);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
