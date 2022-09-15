'use strict';


const mongoose = require('mongoose');


function group() {
  if (group.cache) {
    return group.cache;
  }
  const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    granteds: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now() }
  });
  const Group = mongoose.model('group', groupSchema);
  
  group.cache = Group;
  return group.cache;
}

module.exports = group;