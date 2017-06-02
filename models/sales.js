let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Sales = new Schema({
  order_date : {type : Date, unique : true},
  buyer : {type : String, unique : true},
  phone : String,
  serve_way : String,
  deliver_date_time : Date,
  deliver_building_address : String,
  item : Array,
  tags : Array,
  Total : Number,
  Note : String,
  Weather : String,
  Tempture : String
});

mongoose.model('Sales', Sales);
