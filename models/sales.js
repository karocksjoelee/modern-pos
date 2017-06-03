let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Sales = new Schema({
  orderDate : Date,
  buyer : { type: mongoose.Schema.Types.ObjectId , ref: 'Member' },
  phone : String,
  serveWay : String,
  deliverDateTime : Date,
  deliverBuildingAddress : String,
  items : Array,
  tags : Array,
  total : Number,
  note : String,
  weather : String,
  tempture : String
});

mongoose.model('Sales', Sales);
