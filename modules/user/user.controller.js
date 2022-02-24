'use strict';

module.exports = function userController(resources) {
  const router = require('express').Router();
  const { _r, register_w, authenticate_w, [':userCode_r']: userCode_r } = resources;  
  
  router[_r.method](_r.relativePath, async (req, res, next) => {
    try {
      const users = await _r.service();
      if (!users)
        return res.status(204).send([]);
  
      res.send([...users]);
  
    } catch (err) {
      _r.error(next, err);
    }
  });
   
  router[register_w.method](register_w.relativePath, async function (req, res, next) {
    try {
      const response = await register_w.service(req.body);
    
      res.status(201).json(response);

    } catch (err) {
      register_w.error(next, err);
    }
  });

  router[authenticate_w.method](authenticate_w.relativePath, async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await authenticate_w.service(email, password);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  router[userCode_r.method](userCode_r.relativePath, async (req, res) => {
    const { userCode } = req.params;
  
    try {
      const user = await userCode_r.service({ code: userCode });
      if (!user)
        return res.status(204).send({});
  
      res.send({ ...user.toObject() });
  
    } catch (err) {
      userCode_r.error(next, err);
    }
  });

  return router;
};
