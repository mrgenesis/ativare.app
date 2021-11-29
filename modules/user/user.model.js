'use strict';

module.exports = function userModel() {
  if (userModel.cache) {
    return userModel.cache;
  }
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');

  const Counter = this.models.counter();
  
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    code: { type: String, unique: true },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    createAt: { type: Date, default: Date.now } 
  });
  
  // "pre" quer dizer que será executado antes de salvar no banco
  UserSchema.pre('save', async function(next) {
    const userCounter = await Counter.findOneAndUpdate({ name: 'user' }, { $inc: { code: 1 }, codePrefix: 'U' }, { upsert: true, new: true });
    this.code = userCounter.codePrefix + userCounter.code;
    // this se refere ao objeto que está sendo gravado no banco
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });
  
  const User = mongoose.model('User', UserSchema);
  userModel.cache = User;
  return User;
};
