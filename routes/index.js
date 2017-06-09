let express = require('express');
let router = express.Router();
let mondels = require('../models');
let Manager = module.Manager;
let cm = require('../utility/common-module.js');


router.post('/login', function (req, res, next) {

  if (req.session.logined) {
    res.redirect('/DashBoard');
    return;
  }

  Manager.findOne({
    userName: req.body.userName,
    password: req.body.password
  }, function (err, user) {
    if (err) {
      cm.logErr(err);
      return res.status(500).send();
    }
  });

  if (!user) {
    return res.status(404).send();
  }

  //紀錄session
  req.session.name = req.body.userName;
  req.session.password = req.body.password;
  req.session.logined = true;
  res.redirect('/DashBoard');
});

router.get('/logout', function (req, res, next) {
  req.session.logined = false;
  res.redirect('/index');
  res.end();
});
module.exports = router;
