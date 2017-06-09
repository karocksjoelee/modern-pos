let mondels = require('../models');
let Member = module.Member;
let express = require('express');
let router = express.Router();


router.post('/login', function (req, res, next) {
  Member.find()

  //紀錄session
  req.session.name = req.body.user;
  req.session.password = req.body.password;
  req.session.logined = true;
  res.redirect('/'); //某個頁面

});
