let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Accounting = new Schema({
  date : Date,
  subject : String,
  unit : String,
  account : String
});

mongoose.model('Accounting', Accounting);
