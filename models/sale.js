let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongooseUniqureValidator = require('mongoose-unique-validator');

let Sale = new Schema({
  createDate: String,
  lastUpdateDate: String,
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  buyerName: String,
  type: String,
  phone: String,
  serveWay: String,
  deliverDateTime: String,
  deliverPeriod: String,
  deliverAddress: String,
  deliverBuilding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building"
  },
  orderedItems: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number
  }],
  orderedMealSets: [{
    mealSetId: { type: mongoose.Schema.Types.ObjectId, ref: "MealSet" },
    quantity: Number
  }],
  tags: Array,
  total: Number,
  note: String,
  weather: String,
  tempture: String,
  beenDelivered: Boolean,
  maketingProgram: [{type: mongoose.Schema.Types.ObjectId, ref: 'MarketingProgram'}],
  buyerDiscount: Number,
  businessMemberPoint: Number
});

Sale.plugin(mongooseUniqureValidator);

module.exports = mongoose.model('Sale', Sale);
