let mongoose = require('mongoose');
let cm = require(../utility/common-module);
mongoose.connect('localhost:27017/modern-pos', function(err) {
  cm.logErr(err);
});

require(./accounting);
require(./accountsubject);
require(./buildings);
require(./item);
require(./marketingprogram);
require(./mealset);
require(./member);
require(./sales);

export.Accounting = mongoose.model('Accounting');
export.AccountSubject = mongoose.model('AccountSubject');
export.Buildings = mongoose.model('Buildings');
export.Item = mongoose.model('Item');
export.MarketingProgram = mongoose.model('MarketingProgram');
export.MealSet = mongoose.model('MealSet');
export.Member = mongoose.model('Member');
export.Sales = mongoose.model('Sales');
