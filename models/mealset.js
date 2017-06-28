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
  calorie: Number,
  items: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item'} ],
  image: String,
  active: Boolean,
  description: String
});

MealSet.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('MealSet', MealSet);
