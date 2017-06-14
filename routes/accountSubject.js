// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const AccountSubject = require('../models/accountsubject.js');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res, next) => {
  // Accept an Object according to schema 
  // Object will be in req.body

  let accountSubject = new AccountSubject({
    subjectName: req.body.subjectName,
    subjectEng: req.body.subjectEng,
    subjectType: req.body.subjectType,
    barcode: req.body.barcode,
    unit: req.body.unit,
    main: req.body.main,
    description: req.body.description
  });

  accountSubject.save((err, accountSubject) => {
    console.log(err);
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(accountSubject);
    }

  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    res.status(200).send('All AccountSubjects');
  } else {
    // Or get item by id 
    res.status(200).send('AccountSubject By Id');
  }

});


router.get('/mainIngredient', (req, res) => {
  res.status(201).send('accountSubject.main === true');
});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  res.status(201).send('Updated AccountSubject');
});


router.delete('/:id', (req, res) => {
  res.status(200).send('accountSubject.name Deleted');
});



module.exports = router;
