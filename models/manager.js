let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Manager = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  role: String
});

mongoose.model('Manager', Manager);
