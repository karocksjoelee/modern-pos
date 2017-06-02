let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MarketingProgram = new Schema({
  marketingprogram : { type:String, unique : true },
  category : String,
  beginDate : Date,
  endDate : Date,
  description : String
});

mongoose.model('MarketingProgram', MarketingProgram);
