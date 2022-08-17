
module.exports = function budgetModel(context) {
  if (budgetModel.cache) {
    return budgetModel.cache;
  }
  const mongoose = require('mongoose');
  const Counter = context.model.counter();
  
  const BudgetSchema = new mongoose.Schema({
    ownId: { type: String }, // TODO: essa propriedade será substituída por "own"
    own: { type: Object },
    customer: { type: Object },
    productsList: { type: Array },
    items: { type: Object },
    code: { type: String, unique: true },
    createAt: { type: Date, default: Date.now }
  });
  
  BudgetSchema.pre('save', async function (next) {
    const budgetCounter = await Counter.findOneAndUpdate({ name: 'budget' }, { $inc: { code: 1 }, codePrefix: 'O' }, { upsert: true, new: true });
    this.code = budgetCounter.codePrefix + budgetCounter.code;
    next();
  });
  
  const Budget = mongoose.model('Budget', BudgetSchema);

  budgetModel.cache = Budget;

  return Budget;
}