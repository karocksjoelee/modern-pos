// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const MarketingProgram = require('../models/marketingprogram.js');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let marketingProgram = new MarketingProgram({
    marketingprogram: req.body.marketingprogram,
    category: req.body.category,
    beginDate: req.body.beginDate,
    endDate: req.body.endDate,
    description: req.body.description
  });

  marketingProgram.save((err, marketingProgram) => {
    if (err) {
      console.log(err);
      res.status(500).send(errr);
    } else {
      res.status(201).send(marketingProgram);
    }
  });

});


router.get('/(:id)?', (req, res) => {

  // if doesn't provide id in url params , return all 
  if (!req.params.id) {
    MarketingProgram.find({}, (err, marketingProgram) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(marketingProgram);
      }
    })

  } else {
    // Or get item by id 
    MarketingProgram.find({
      _id: req.params.id
    }, (err, marketingProgram) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(marketingProgram);
      }
    });
  }

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  MarketingProgram.findOne({
    _id: req.params.id
  }, (err, marketingProgram) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    marketingProgram.marketingprogram = req.body.marketingprogram || marketingProgram.marketingprogram;
    marketingProgram.category = req.body.category || marketingProgram.category;
    marketingProgram.beginDate = req.body.beginDate || marketingProgram.beginDate;
    marketingProgram.endDate = req.body.endDate || marketingProgram.endDate;
    marketingProgram.description = req.body.description || marketingProgram.description;

    marketingProgram.save((err, marketingProgram) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(marketingProgram);
      }
    });
  });

});


router.delete('/:id', (req, res) => {
  MarketingProgram.findOne({
    _id: req.params.id
  }, (err, marketingProgram) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    marketingProgram.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("MarketingProgram Deleted!!");
      }
    });
  });

});



module.exports = router;
