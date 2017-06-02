let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSubject = new Schema({
  subjectName : { type:String, unique : true },
  subjectEng : { type:String, unique : true },
  subjectType: String,
  barcode : { type:String, unique : true },
  unit : String,
  main : Boolean,
  description : String
});

mongoose.model('AccountSubject', AccountSubject);
