'use strict';
module.exports = function materialModel(context) {
  if (materialModel.cache) {
    return materialModel.cache;
  }
  
  const mongoose = require('mongoose');
  const Counter = context.model.counter();
  
  const MaterialSchema = new mongoose.Schema({
    name: { type: String },
    unitPrice: { type: Number },
    limit: { type: Number },
    ms: { type: Number },
    code: { type: Number, unique: true },
    createAt: { type: Date, default: Date.now }
  });
  
  
  MaterialSchema.pre('save', async function (next) {
    const materialCode = await Counter.findOneAndUpdate({ name: 'material' }, { $inc: { code: 1 } }, { upsert: true, new: true });
    this.code = materialCode.code;
    next();
  });
  
  const Material = mongoose.model('Material', MaterialSchema);
  
  materialModel.cache = Material;
  return Material;
}
