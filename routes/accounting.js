// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Mongo Schema 
const Accounting = require('../models/accounting');
//utility
const cm = require('../utility/common-module.js');

// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body

  let accounting = new Accouting({
    date: req.body.date,
    accountSubject: req.body.accountSubject,
    unit: req.body.unit,
    amount: req.body.amount
  });

  accounting.save((err, accounting) => {
    if (err) {
      cm.logErr(err);
      res.status(500).send(err);
    }
    res.status(201).send(accounting);
  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    Accounting.find({})
      .populate('accountSubject')
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).send(data);
      });

  } else {
    // Or get item by id 
    Accounting.find({
        _id: req.params.id
      })
      .populate('accountSubject')
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });

  }

});


router.get('/byDate/:date', (req, res) => {
  let year = req.params.date.slice(0, 4);
  let month = req.params.date.slice(4, 6);
  let date = year + "-" + month;

  Accounting.find({
    date: {
      $regex: date
    }
  }, (err, account) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(account);
    }
  });

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Accounting.findOne({
    _id: req.params.id
  }, (err, account) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    account.ate = req.body.date || account.ate;
    account.accountSubject = req.body.accountSubject || account.accountSubject;
    account.unit = req.body.unit || account.unit;
    account.amount = req.body.amount || account.amount;

    account.save((err, account) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(account);
      }
    });
  })

});


router.delete('/:id', (req, res) => {
  Accounting.findOne({
    _id: req.params.id
  }, (err, account) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    account.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("Accounting Deleted!!");
      }
    });
  });

});



module.exports = router;
