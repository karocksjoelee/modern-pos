// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const cm = require('../utility/common-module');

// Mongo Schema 
const MealSet = require('../models/mealset');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let mealSet = new MealSet({
    setName: req.body.setName,
    barcode: req.body.barcode,
    calorie: req.body.calorie, 
    price: req.body.price,
    items: req.body.items,
    image: req.body.image,
    active: req.body.active,
    description: req.body.description
  });

  mealSet.save((err, mealSet) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      cm.logSuc(`[MONGO] New MealSet - ${mealSet.setName}`);
      res.status(201).send(mealSet);
    }
  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    MealSet.find({})
        .populate('items')
        .exec((err, mealSets) => {
          if(err) {
            console.log(err);
            res.status(500).send(err);
          }else {
            cm.logSuc(`[MONGO] GOT ${mealSets.length} MealSets`);
            res.status(200).send(mealSets);
          }
        });

  } else {

     MealSet.find({_id: req.params.id})
        .populate('items')
        .exec((err, mealSet) => {
          if(err) {
            console.log(err);
            res.status(500).send(err);
          }else {
            cm.logSuc(`[MONGO] GOT ${mealSet[0].setName} - matched : ${mealSet.length}`);
            res.status(200).send(mealSet);
          }
        });

  }

});


router.get('/activedMealSet', (req, res) => {

  MealSet.find({
    active: true
  }, (err, mealSet) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(mealSet);
    }
  });

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 

  MealSet.findOne({
    _id: req.params.id
  }, (err, mealSet) => {

    if (err) return res.status(500).send(err);

    mealSet.setName = req.body.setName || mealSet.setName;
    mealSet.barcode = req.body.barcode || mealSet.barcode;
    mealSet.price = req.body.price || mealSet.price;
    mealSet.items = req.body.items || mealSet.items;
    mealSet.image = req.body.image || mealSet.image;
    mealSet.active = req.body.active;
    mealSet.calorie = req.body.calorie || mealSet.calorie;
    mealSet.description = req.body.description || mealSet.description;


    mealSet.save((err, mealSet) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] UPDATED MealSet ${mealSet.setName}`);
        res.status(201).send(mealSet);
      }
    });
  });

});


router.delete('/:id', (req, res) => {

  MealSet.findOne({
    _id: req.params.id
  }, (err, mealSet) => {
    cm.logWarn(`[MONGO] Deleting ... ${mealSet.setName}`);
    if (err) return res.status(500).send(err);

    mealSet.remove((err) => {
      if (err) {
        console.log(500);
        res.status(500).send(err);
      } else {
        cm.logWarn(`[MONGO] DELETED MealSet - ${mealSet.setName}`);
        res.status(200).send('mealSet Deleted!!');
      }
    });
  });

});



module.exports = router;
