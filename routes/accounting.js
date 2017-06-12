// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Accouting = require('../models/accounting');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
    // Accept an Object according to schema 
    // Object will be in req.body
    res.status(201).send('Created Accouting'); 
});


router.get('/(:id)?', (req, res) => {

    if(!req.params.id){
        // if doesn't provide id in url params , return all 
        res.status(200).send('All Accoutings');
    }else {
        // Or get item by id 
        res.status(200).send('Accoutings By Id');
    }

});


router.get('/byDate/:date', (req, res) => {
    res.status(200).send('Return Accouting.date.year === req.params.date.year &&  Accouting.date.month === req.params.date.month ')
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


