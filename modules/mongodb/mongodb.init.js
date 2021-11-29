'use strict';

module.exports = async function init(mongooseConfig){
  const mongoose = require('mongoose');
  const options = {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
  , connectionString = this.prepateConnectionString(mongooseConfig);

  await mongoose.connect(connectionString, options)
  .then(function (result) {
    console.log('<<<<<< MongoDB >>>>> connection sucessful. DB:', connectionString);
  })
  .catch(function (error) {
    console.log(error.message);
    console.log('Error occurred while connecting to DB:', connectionString);
  })
}

