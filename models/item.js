let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Item = new Schema({
  name : { type:String, unique : true },
  category : String,
  barcode : { type:String, unique : true },
  price : Number,
  unit : String,
  image : String,
  calorie : String,
  ingredient : { type: mongoose.Schema.Types.ObjectId , ref: 'accountSubject' },
  description : String,
  active : Boolean
});

mongoose.model('Item', Item);
