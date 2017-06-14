let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let MealSet = new Schema({
  setName: {
    type: String,
    unique: true
  },
  barcode: {
    type: String,
    unique: true
  },
  price: Number,
  items: Array,
  image: String,
  active: Boolean
});

MealSet.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('MealSet', MealSet);
