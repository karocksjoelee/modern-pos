let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Accounting = new Schema({
  date : Date,
  accountSubject : {type: mongoose.Schema.Types.ObjectId , ref: 'AccountSubject'},
  unit : String,
  amount : Number
});

mongoose.model('Accounting', Accounting);
