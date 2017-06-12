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
    res.status(201).send('Created Building'); 
});


router.get('/(:id)?', (req, res) => {

    if(!req.params.id){
        // if doesn't provide id in url params , return all 
        res.status(200).send('All Buildings');
    }else {
        // Or get item by id 
        res.status(200).send('Buildings By Id');
    }

});


router.put('/:id', (req, res) => {
    // Find specific item of id and update it .
    // Object will be in req.body 
    res.status(201).send('Updated Building');
});


router.delete('/:id', (req, res) => {
    res.status(200).send('building.name Deleted');
});



module.exports = router;


