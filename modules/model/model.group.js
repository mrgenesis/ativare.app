'use strict';


const mongoose = require('mongoose');


function group() {
  if (group.cache) {
    return group.cache;
  }
  const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: { type: Array, default: [] },
    allowed: { type: Array, default: [] }
  });
  const group = mongoose.model('group', groupSchema);
  
  group.cache = group;
  return group.cache;
}

module.exports = group;