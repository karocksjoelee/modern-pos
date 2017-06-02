let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Member = new Schema({
  name: { type: String, unique: true },
  birthday: String,
  phone: { type: String, unique: true },
  since: Date,
  contact: {
    line: String,
    facebook: String,
    email: String
  },
  locationInfo: {
    homeAddr: {
      building: String,
      address: String
    },
    officeAddr: {
      building: String,
      address: String
    }
  },
  personalInfo: {
    gender: String,
    weight: String,
    height: String,
    tags: Array
  },
  attachments: {
    membershipTerm: Array,
    memberStatus: Boolean,
    unExchanged: Number,
    exchanged: Number,
    orderHistories: Array
  }
});

mongoose.model('Member', Member);
