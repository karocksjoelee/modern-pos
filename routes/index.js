let express = require('express');
let router = express.Router();
let mondels = require('../models');
let Manager = module.Manager;
let cm = require('../utility/common-module.js');

router.post('/login', (req, res) => {
  Manager.findOne({
    userName: req.body.userName,
    password: req.body.password
  }, function (err, user) {
    if (err) {
      cm.logErr(err);
      res.status(500).send('database ocure error');
    }
  });
  if (!user) {
    res.status(404).send('Not found manager');
  }
  res.status(200).send('success login!!');
});

module.exports = router;
