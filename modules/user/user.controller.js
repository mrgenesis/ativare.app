'use strict';

module.exports = function userController(app) {
  const UserModule = this;
  const router = require('express').Router();
  const UserMiddleware = UserModule.middleware();
  const UserService = UserModule.service();

  router.get('/', async (req, res) => {

    try {
      const users = await UserService.getAll();
  
      if (!users)
        return res.status(204).send([]);
  
      res.send([...users]);
  
    } catch (err) {
      console.log(err);
      res.status(400).send({ Error: "error" });
    }
  });
   
  router.post('/register', UserMiddleware.addUser, async function (req, res, next) {
    try {
      const response = await UserService.createUser(req.body);
      res.status(201).json(response);

    } catch (err) {
      //err.isAppError ? next(err) : next(UserModule.userError(err));
    }
  });

  router.post('/authenticate', UserMiddleware.authUser, async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await UserService.auth(email, password);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userCode', async (req, res) => {
    const { userCode } = req.params;
  
    try {
      const user = await UserService.findOne({ code: userCode });
      if (!user)
        return res.status(204).send({});
  
      res.send({ ...user.toObject() });
  
    } catch (err) {
      console.log(err);
      res.status(400).send({ Error: "error" });
    }
  });

  app.use('/auth', router);
};
