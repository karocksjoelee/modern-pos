let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Member = new Schema({
  name: {
    type: String,
    unique: true
  },
  birthday: String,
  phone: {
    type: String,
    unique: true
  },
  since: String,
  type: String,
  line: String,
  facebook: String,
  email: String,
  homeBuilding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buildings"
  },
  homeAddress: String,
  officeBuilding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buildings"
  },
  officeAddress: String,
  gender: String,
  weight: String,
  height: String,
  tags: Array,
  membershipTerm: Array,
  memberStatus: Boolean,
  unExchanged: Number,
  exchanged: Number,
  orderHistories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale"
  }
});

Member.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Member', Member);
