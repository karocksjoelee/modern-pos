let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Accounting = new Schema({
  date: String,
  accountSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountSubject'
  },
  unit: String,
  amount: Number,
  quantity: Number,
  notes: String
});

Accounting.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Accounting', Accounting);
