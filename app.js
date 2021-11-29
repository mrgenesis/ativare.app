var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var mongodb = require('./modules/mongodb/mongodb.module');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//mongodb.init(); //>>>>>

app.use(function (req, res, next) {
  // implemente uma função para controlar o acesso
  next();
})


/////////////////////////////////////////////////// Remover em PRD
const cors = require('cors');
app.use(cors());
//////////////////////////////////////////////////////
const Tools = require('./modules/necessary/necessary.module');
Tools.init(app);


app.get('/', function (req, res) {
  const pkg = require(path.join(__dirname, 'package.json'));
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: 'up'
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error,
    status: res.status
  });
});

module.exports = app;
