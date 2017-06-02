let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MealSet = new Schema({
  setname : {type:String, unique : true},
  bar_code : {type:String, unique : true},
  price : Number,
  items : Array,
  image : String,
  active : Boolean
});

mongoose.model('MealSet', MealSet);
