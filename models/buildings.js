let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Buildings = new Schema({
  name : {type:String, unique : true},
  category : {type:String, unique : true},
  address : {type:String, unique : true},
  lat : String,
  lng : String,
  description : String
});

mongoose.model('Buildings', Buildings);
