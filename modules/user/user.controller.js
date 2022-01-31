'use strict';

module.exports = function userController(src) {
  const { _r, register_w, authenticate_w, [':userCode_r']: userCode_r } = src;  
  const router = require('express').Router();
  
  router[_r.method](_r.relativePath, async (req, res) => {
    try {
      const users = await _r.service();
      if (!users)
        return res.status(204).send([]);
  
      res.send([...users]);
  
    } catch (err) {
      console.log(err);
      res.status(400).send({ Error: "error" });
    }
  });
   
  router[register_w.method](register_w.relativePath, async function (req, res, next) {
    try {
      const response = await register_w.service(req.body);
    
      res.status(201).json(response);

    } catch (err) {
      //err.isAppError ? next(err) : next(UserModule.userError(err));
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
      console.log(err);
      res.status(400).send({ Error: "error" });
    }
  });

  return router;
};
