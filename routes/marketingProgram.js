// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const MarketingProgram = require('../models/marketingProgram');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
    // Accept an Object according to schema 
    // Object will be in req.body
    res.status(201).send('Created MarketingProgram'); 
});


router.get('/(:id)?', (req, res) => {

    if(!req.params.id){
        // if doesn't provide id in url params , return all 
        res.status(200).send('All MarketingPrograms');
    }else {
        // Or get item by id 
        res.status(200).send('MarketingPrograms By Id');
    }

});


router.put('/:id', (req, res) => {
    // Find specific item of id and update it .
    // Object will be in req.body 
    res.status(201).send('Updated MarketingProgram');
});


router.delete('/:id', (req, res) => {
    res.status(200).send('MarketingProgram.name Deleted');
});



module.exports = router;


