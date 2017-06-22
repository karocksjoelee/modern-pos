let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Sale = new Schema({
  orderDate: String,
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  phone: String,
  serveWay: String,
  deliverDateTime: String,
  deliverBuildingAddress: String,
  items: Array,
  tags: Array,
  total: Number,
  note: String,
  weather: String,
  tempture: String
});

Sale.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Sale', Sale);
