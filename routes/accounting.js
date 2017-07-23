// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cm = require('../utility/common-module.js');

// Mongo Schema 
const Accounting = require('../models/accounting');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body

  let accounting = new Accounting({
    date: req.body.date,
    accountSubject: req.body.accountSubject,
    unit: req.body.unit,
    amount: req.body.amount,
    notes: req.body.notes,
    quantity: req.body.quantity
  });

  accounting.save((err, accounting) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    cm.logSuc(`[MONGO] NEW Accouting - ${accouting.accountSubject} : ${accouting.amount}`);
    res.status(201).send(accounting);
  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    Accounting.find({})
      .populate('accountSubject')
      .exec((err, accounting) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        cm.logSuc(`[MONGO] GOT - ${accounting.length} Accountings`);
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
          cm.logSuc(`[MONGO] GOT Accounting ${accounting[0]._id} - matched : ${accounting.length}`);
          res.status(200).send(data);
        }
      });

  }

});


router.get('/byDate/:date', (req, res) => {

  let year = req.params.date.slice(0, 4);
  let month = req.params.date.slice(4, 6);
  let date = year + "-" + month;

  Accounting.find({date: {$regex: date}})
    .populate('accountSubject')
    .exec((err, accountings) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      }else {
        cm.logSuc(`[MONGO] GOT - ${accountings.length} Accountings from ${date}` );
        res.status(200).send(accountings);
      }
    });

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Accounting.findOne({
    _id: req.params.id
  }, (err, accounting) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    accounting.date = req.body.date || accounting.date;
    accounting.accountSubject = req.body.accountSubject || accounting.accountSubject;
    accounting.unit = req.body.unit || accounting.unit;
    accounting.amount = req.body.amount || accounting.amount;

    accounting.save((err, accounting) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] UPDATED - Accounting ID : ${accouning._id}`);
        res.status(201).send(accounting);
      }
    });
  });

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
        cm.logWarn(`[MONGO] DELETED - ACCOUNTING`);
        res.status(200).send("Accounting Deleted!!");
      }
    });
  });

});



module.exports = router;
