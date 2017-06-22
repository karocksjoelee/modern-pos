// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Building = require('../models/buildings');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let building = new Building({
    name: req.body.name,
    category: req.body.category,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng,
    description: req.body.description
  });

  building.save((err, building) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(building);
    }
  });
});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 

    Building.find({}, (err, building) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(building);
      }
    });
  } else {
    // Or get item by id 
    Building.find({
      _id: req.params.id
    }, (err, building) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(building);
      }
    });
  }

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Building.findOne({
    _id: req.params.id
  }, (err, building) => {
    building.name = req.body.name || building.name;
    building.category = req.body.category || building.category;
    building.address = req.body.address || building.address;
    building.lat = req.body.lat || building.lat;
    building.lng = req.body.lng || building.lng;
    building.description = req.body.description || building.description;

    building.save((err, building) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(building);
      }
    });
  });

});


router.delete('/:id', (req, res) => {
  Building.findOne({
    _id: req.params.id
  }, (err, building) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    building.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("Building Deleted!!");
      }
    });
  });

});



module.exports = router;
