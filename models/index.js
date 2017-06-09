let mongoose = require('mongoose');
let cm = require('../utility/common-module');
mongoose.connect('localhost:27017/modern-pos', function (err) {
  cm.logErr(err);
});

require('./accounting');
require('./accountsubject');
require('./buildings');
require('./item');
require('./marketingprogram');
require('./mealset');
require('./member');
require('./sales');

exports.Accounting = mongoose.model('Accounting');
exports.AccountSubject = mongoose.model('AccountSubject');
exports.Buildings = mongoose.model('Buildings');
exports.Item = mongoose.model('Item');
exports.MarketingProgram = mongoose.model('MarketingProgram');
exports.MealSet = mongoose.model('MealSet');
exports.Member = mongoose.model('Member');
exports.Sales = mongoose.model('Sales');
