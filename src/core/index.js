const Context = require('./context');
const context = new Context();

const AppError = require('./app-error/app-error.module');
const appError = new AppError();
context.addProperty(appError.constructor.name, appError);

const Helper = require('./helper/helper.module');
const helper = new Helper(context);
context.addProperty(helper.constructor.name, helper);

const Classes = require('./classes/classes.module');
const classes = new Classes(context);
context.addProperty(classes.constructor.name, classes);

const ExtendedClass = require('./extended-class/extended-class.module');
const extendedClass = new ExtendedClass(context);
context.addProperty(extendedClass.constructor.name, extendedClass);

const Middleware = require('./middleware/middleware.module');
const middleware = new Middleware(context);
context.addProperty(middleware.constructor.name, middleware);

const Subscriber = require('./subscriber/subscriber.module');
const subscriber = new Subscriber(context);
context.addProperty(subscriber.constructor.name, subscriber);

const Model = require('./model/model.module');
const db = require('./data/data.module');
const model = new Model();
context.addProperty('model', model);

const InitSystem = require('./init-system/init-system.module');
const initSystem = new InitSystem(context);

class Start {
  constructor({ appConfigPath } = {}) {
    initSystem.configure(appConfigPath);
    initSystem.make(db);
    return initSystem.getApp();
  }
}

module.exports = Start;
