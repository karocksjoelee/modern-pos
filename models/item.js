let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Item = new Schema({
  name: {
    type: String,
    unique: true
  },
  category: String,
  barcode: {
    type: String,
    unique: true
  },
  price: Number,
  unit: String,
  image: String,
  calorie: String,
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountSubject'
  },
  description: String,
  active: Boolean
});

Item.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Item', Item);
