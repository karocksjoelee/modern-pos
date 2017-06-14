let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let AccountSubject = new Schema({
  subjectName: {
    type: String,
    unique: true
  },
  subjectEng: {
    type: String,
    unique: true
  },
  subjectType: String,
  barcode: {
    type: String,
    unique: true
  },
  unit: String,
  main: Boolean,
  description: String
});

AccountSubject.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('AccountSubject', AccountSubject);
