'use strict';


const mongoose = require('mongoose');


function group() {
  if (group.cache) {
    return group.cache;
  }
  const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: { type: Array, default: [] },
    resources: { type: Object, default: {} },
    fullAccess: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now() }
  });
  const Group = mongoose.model('group', groupSchema);
  
  group.cache = Group;
  return group.cache;
}

module.exports = group;