let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MarketingProgram = new Schema({
  marketingprogram : {type:String, unique : true},
  category : {type:String, unique : true},
  begin_date : Date,
  end_date : Date,
  description : String
});

mongoose.model('MarketingProgram', MarketingProgram);
