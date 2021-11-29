'use strict';


const mongoose = require('mongoose');


function mongooseCounterModel() {
  if (mongooseCounterModel.cache) return mongooseCounterModel.cache;
  const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, dafault: 0 },
    codePrefix: { type: String }
  });
  const Counter = mongoose.model('counter', counterSchema);
  
  mongooseCounterModel.cache = Counter;
  return mongooseCounterModel.cache;
}
module.exports = mongooseCounterModel;