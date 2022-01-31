'use strict';

module.exports = function userModel(context) {
  if (userModel.cache) {
    return userModel.cache;
  }
  const mongoose = require('mongoose');
  const { Auth } = context.Classes;
  const auth = new Auth();

  const Counter = context.model.counter();
  
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    code: { type: String, unique: true },
    group: { type: String, default: 'none' },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    createAt: { type: Date, default: Date.now, select: false },
  });
  
  // "pre" quer dizer que será executado antes de salvar no banco
  UserSchema.pre('save', async function(next) {
    const userCounter = await Counter.findOneAndUpdate({ name: 'user' }, { $inc: { code: 1 }, codePrefix: 'U' }, { upsert: true, new: true });
    this.code = userCounter.codePrefix + userCounter.code;
    // this se refere ao objeto que está sendo gravado no banco
    auth.hashPassword(this.password, 10).then(hash => {
      this.password = hash;
      next();
    });
  });
  
  const User = mongoose.model('User', UserSchema);
  userModel.cache = User;
  return User;
};
