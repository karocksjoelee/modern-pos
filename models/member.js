let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Member = new Schema({
  name : {type:String, unique : true},
  birthday : {type:String, unique: true},
  phone : {type: String, unique: true},
  since : Date,
  contact : [{
    line : String,
    facebook : String,
    email : String}],
  location_info : [{
    home_building_add : String,
    office_building_add : String}],
  personal_info : [{
    gender : String,
    weight : String,
    height : String,
    tags : Array}],
  attachments : [{
    membership_term : Array,
    memberstatus : Boolean,
    unexchanged : Number,
    exchanged : Number,
    order_history : Array
  }]
});

mongoose.model('Member', Member);
