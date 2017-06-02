let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSubject = new Schema({
  subjectname : {type:String, unique : true},
  subjecteng : {type:String, unique : true},
  subjecttype: {type:String, unique : true},
  bar_code : {type:String, unique : true},
  unit : String,
  main : Boolean,
  description : String
});

mongoose.model('AccountSubject', AccountSubject);
