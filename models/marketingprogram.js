let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let MarketingProgram = new Schema({
  marketingprogram: {
    type: String,
    unique: true
  },
  category: String,
  beginDate: Date,
  endDate: Date,
  description: String
});

MarketingProgram.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('MarketingProgram', MarketingProgram);
