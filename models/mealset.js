let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MealSet = new Schema({
  setName : { type:String, unique : true },
  barcode : { type:String, unique : true },
  price : Number,
  items : Array,
  image : String,
  active : Boolean
});

mongoose.model('MealSet', MealSet);
