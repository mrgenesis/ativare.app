'use strict';

module.exports = function init(mongooseConfig){
  const mongoose = require('mongoose');
  const options = {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  , logConectionStr = str => (process.env.NODE_ENV === 'production') ? str.replace(mongooseConfig.password, '******** PASSWORD PRIVATE *****') : str
  , connectionString = this.prepateConnectionString(mongooseConfig);

  return mongoose.connect(connectionString, options)
  .then(function (result) {
    if(process.env.NODE_ENV === 'production') {
      console.log('<<<<<< MongoDB >>>>> connection sucessful. DB:', logConectionStr(connectionString));
      return;
    }
    console.log('<<<<<< MongoDB >>>>> connection sucessful. DB:', logConectionStr(connectionString));
  })
  .catch(function (error) {
    console.log(error.message);
    console.log('Error occurred while connecting to DB:', logConectionStr(connectionString));
  });
};
