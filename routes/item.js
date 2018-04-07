// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const cm = require('../utility/common-module');

// Mongo Schema 
const Item = require('../models/item');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let item = new Item({
    name: req.body.name,
    category: req.body.category,
    barcode: req.body.barcode,
    price: req.body.price,
    unit: req.body.unit,
    image: req.body.image,
    calorie: req.body.calorie,
    ingredient: req.body.ingredient,
    description: req.body.description,
    active: req.body.active
  });

  item.save((err, item) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      cm.logSuc(`[MONGO] NEW Item - ${item.name}`);
      res.status(201).send(item);
    }

  });
});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    Item.find({})
      .populate("ingredient") 
      .exec((err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          cm.logSuc(`[MONGO] GOT - ${items.length} Items`);
          res.status(200).send(items);
        }
      });

  } else {
    // Or get item by id 
    Item.find({
        _id: req.params.id
      })
      .populate("ingredient")
      .exec((err, item) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          cm.logSuc(`[MONGO] GOT Item ${item[0].name} - matched : ${item.length}`);
          res.status(200).send(item);
        }
      });
  }

});


router.get('/activedItem', (req, res) => {

  Item.find({
      active: true
    })
    .populate('ingredient')
    .exec((err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(items);
      }
    });

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Item.findOne({
    _id: req.params.id
  }, (err, item) => {

    if (err) return res.status(500).send(err);

    item.name = req.body.name || item.name;
    item.category = req.body.category || item.category;
    item.barcode = req.body.barcode || item.barcode;
    item.price = req.body.price || item.price;
    item.unit = req.body.unit || item.unit;
    item.image = req.body.image || item.image;
    item.calorie = req.body.calorie || item.calorie;
    item.ingredient = req.body.ingredient || item.ingredient;
    item.description = req.body.description || item.description;
    item.active = req.body.active;

    item.save((err, item) => {
      if (err) {
        console.log(err);
      } else {
        cm.logSuc(`[MONGO] UPDATED Item ${item.name}`);
        res.status(201).send(item);
      }
    });

  });
});


router.delete('/:id', (req, res) => {

  Item.findOne({
    _id: req.params.id
  }, (err, item) => {
    cm.logWarn(`[MONGO] Deleting ... ${item.name}`);
    if (err) return res.status(500).send(err);

    item.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        cm.logWarn(`[MONGO] DELETED Item - ${item.name}`);
        res.status(200).send('item Deleted');
      }
    });
  });
});



module.exports = router;
