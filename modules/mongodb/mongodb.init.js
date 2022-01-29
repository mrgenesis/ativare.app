'use strict';

module.exports = function init(mongooseConfig){
  const mongoose = require('mongoose');
  const options = {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
  , connectionString = this.prepateConnectionString(mongooseConfig);

  return mongoose.connect(connectionString, options)
  .then(function (result) {
    console.log('<<<<<< MongoDB >>>>> connection sucessful. DB:', connectionString);
  })
  .catch(function (error) {
    console.log(error.message);
    console.log('Error occurred while connecting to DB:', connectionString);
  });
};
