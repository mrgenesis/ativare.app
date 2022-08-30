'use strict';
const router = require('express').Router();

module.exports = function userController(resources, appConfig) { // TODO: adicionar appConfig em resources
  const { authenticate_r, ['receive-aad-data_w']: receiveAddData_w } = resources;
  // console.log(resources)
  console.log(receiveAddData_w.getDataAll())
  
  router[authenticate_r.method](authenticate_r.relativePath, async function (req, res, next) {
    try {
      const response = await authenticate_r.service(req, appConfig);
      res.status(200).json({ urlAuth: response });
    } catch (err) {
      authenticate_r.error(next, err);
    }    
  });

  router[receiveAddData_w.method](receiveAddData_w.relativePath, async function (req, res, next) {   
    try {
      const authCodeUrlResponse = await receiveAddData_w.service(req.getReqHandler(), req.body);
      res.status(201).json({ urlAuth: authCodeUrlResponse });
    } catch (err) {
      receiveAddData_w.error(next, err);
    }
    
  });

  return router;
};
