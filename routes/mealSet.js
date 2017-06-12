// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const MealSet = require('../models/mealSet');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
    // Accept an Object according to schema 
    // Object will be in req.body
    res.status(201).send('Created MealSet'); 
});


router.get('/(:id)?', (req, res) => {

    if(!req.params.id){
        // if doesn't provide id in url params , return all 
        res.status(200).send('All MealSets');
    }else {
        // Or get item by id 
        res.status(200).send('MealSet By Id');
    }

});


router.get('/activedMealSet', (req, res) => {
    res.status(200).send('if mealSet.active === true')
});


router.put('/:id', (req, res) => {
    // Find specific item of id and update it .
    // Object will be in req.body 
    res.status(201).send('Updated MealSet');
});


router.delete('/:id', (req, res) => {
    res.status(200).send('mealSet.setName Deleted');
});



module.exports = router;


