// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Item = require('../models/item');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  res.status(201).send('Created Item');
});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    res.status(200).send('All Items');
  } else {
    // Or get item by id 
    res.status(200).send('Item By Id');
  }

});


router.get('/activedItem', (req, res) => {
  res.status(200).send('if item.active === true');
});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  res.status(201).send('Updated Item');
});


router.delete('/:id', (req, res) => {
  res.status(200).send('item.name Deleted');
});



module.exports = router;
