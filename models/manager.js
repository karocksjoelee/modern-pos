let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Manager = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  role: String
});

Manager.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Manager', Manager);
