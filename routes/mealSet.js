// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'images/'
});
// Mongo Schema 
const MealSet = require('../models/mealset');


// RESTful API 
// ==========================================================================================
router.post('/', upload.single('image'), (err, req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  if (err) {
    console.log(err);
    res.status(500).send(err);
  }

  let mealSet = new MealSet({
    setName: req.body.setName,
    barcode: req.body.barcode,
    price: req.body.price,
    items: req.body.items,
    image: req.file.path,
    active: req.body.active
  });

  mealSet.save((err, mealSet) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(mealSet);
    }
  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    MealSet.find({}, (err, mealSet) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(mealSet);
      }
    });

  } else {
    // Or get item by id 
    MealSet.find({
      _id: req.params.id
    }, (err, mealSet) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(mealSet);
      }
    });
    res.status(200).send('MealSet By Id');
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
    mealSet.active = req.body.active || mealSet.active;


    mealSet.save((err, mealSet) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(mealSet);
      }
    });
  });

});


router.delete('/:id', (req, res) => {

  MealSet.findOne({
    _id: req.params.id
  }, (err, mealSet) => {
    if (err) return res.status(500).send(err);

    mealSet.remove((err) => {
      if (err) {
        console.log(500);
        res.status(500).send(err);
      } else {
        res.status(200).send('mealSet Deleted!!');
      }
    });
  });

});



module.exports = router;
