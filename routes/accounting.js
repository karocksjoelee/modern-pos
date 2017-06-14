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
        .exec((err,data) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            res.status(200).send(data);
        });

  } else {
    // Or get item by id 
    res.status(200).send('Accoutings By Id');
  }

});


router.get('/byDate/:date', (req, res) => {
  res.status(200)
    .send('Return Accouting.date.year' +
      '=== req.params.date.year &&  Accouting.date.month' +
      '=== req.params.date.month ');
});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  res.status(201).send('Updated Accouting');
});


router.delete('/:id', (req, res) => {
  res.status(200).send('Accouting.name Deleted');
});



module.exports = router;
