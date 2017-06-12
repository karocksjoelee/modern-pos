// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Sale = require('../models/sale');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
    // Accept an Object according to schema 
    // Object will be in req.body
    res.status(201).send('Created Sale'); 
});


router.get('/(:id)?', (req, res) => {

    if(!req.params.id){
        // if doesn't provide id in url params , return all 
        res.status(200).send('All Sales');
    }else {
        // Or get item by id 
        res.status(200).send('Sale By Id');
    }

});


router.get('/byDate/:date', (req, res) => {
    res.status(200).send('Return Sale.date.year === req.params.date.year &&  Sale.date.month === req.params.date.month ')
});


router.put('/:id', (req, res) => {
    // Find specific item of id and update it .
    // Object will be in req.body 
    res.status(201).send('Updated Sale');
});


router.delete('/:id', (req, res) => {
    res.status(200).send('Sale.orderDate , Sale.buyer Deleted');
});



module.exports = router;


