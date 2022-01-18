'use strict';


const mongoose = require('mongoose');


function counter() {
  if (counter.cache) {
    return counter.cache;
  }
  const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, dafault: 0 },
    codePrefix: { type: String }
  });
  const Counter = mongoose.model('counter', counterSchema);
  
  counter.cache = Counter;
  return counter.cache;
}

module.exports = counter;