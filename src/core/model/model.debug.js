'use strict';

const mongoose = require('mongoose');

function debug() {
  if (debug.cache) {
    return debug.cache;
  }
  const debugSchema = new mongoose.Schema({
    errorId: { type: String, unique: true },
    rawData: { type: Object },
    createdAt: { type: Date, default: (new Date()).toUTCString() },
    supportStatus: { type: String, default: 'opened' }
  });
  const Debug = mongoose.model('debug', debugSchema);
  
  debug.cache = Debug;
  return debug.cache;
}

module.exports = debug;
