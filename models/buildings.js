let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');


let Buildings = new Schema({
  name: {
    type: String,
    unique: true
  },
  category: String,
  address: {
    type: String,
    unique: true
  },
  lat: String,
  lng: String,
  description: String
});

Buildings.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Buildings', Buildings);
