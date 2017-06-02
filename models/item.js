let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Item = new Schema({
  name : {type:String, unique : true},
  category : {type:String, unique : true},
  bar_code : {type:String, unique : true},
  price : Number,
  unit : String,
  image : String,
  Calorie : String,
  ingredient : String,
  description : String,
  active : Boolean
});

mongoose.model('Item', Item);
