// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const cm = require('../utility/common-module');

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
      cm.logSuc(`[MONGO] NEW AccountSubject - ${accountSubject.subjectName}`);
      res.status(201).send(accountSubject);
    }
  });

});

router.get('/mainIngredient', (req, res) => {

  console.log('WTF?');

  AccountSubject.find({
    'main': true
  }, (err, accountSubjects) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      cm.logSuc(`[MONGO] GOT ${accountSubjects.length} Main Ingredients`);
      res.status(200).send(accountSubjects);
    }
  });
});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {

    // if doesn't provide id in url params , return all 
    AccountSubject.find({}, (err, accountSubject) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] GOT ${accountSubject.length} AccountSubjects`);
        res.status(200).send(accountSubject);
      }
    });

  } else {
    // Or get item by id 
    AccountSubject.find({
      _id: req.params.id
    }, (err, accountSubject) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] GOT AccountSubject - ${accountSubject[0].subjectName} - matched : ${accountSubject.length}`);
        res.status(200).send(accountSubject);
      }
    });
  }

});




// router.get('/mainIngredient', (req, res) => {

//   AccountSubject.find({} , (err, accountSubjects) => {
//     if(err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(accountSubjects);
//     }
//   });

// });


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  AccountSubject.findOne({
    _id: req.params.id
  }, (err, accountSubject) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    accountSubject.subjectName = req.body.subjectName || accountSubject.subjectName;
    accountSubject.subjectEng = req.body.subjectEng || accountSubject.subjectEng;
    accountSubject.subjectType = req.body.subjectType || accountSubject.subjectType;
    accountSubject.barcode = req.body.barcode || accountSubject.barcode;
    accountSubject.unit = req.body.unit || accountSubject.unit;
    accountSubject.main = req.body.main;
    accountSubject.description = req.body.description || accountSubject.description;

    accountSubject.save((err, accountSubject) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] UPDATED AccountSubject ${accountSubject.subjectName}`);
        res.status(201).send(accountSubject);
      }
    });
  });
});


router.delete('/:id', (req, res) => {
  AccountSubject.findOne({
    _id: req.params.id
  }, (err, accountSubject) => {
    cm.logWarn(`[MONGO] Deleting ... ${accountSubject.subjectName}`);
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    accountSubject.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logWarn(`[MONGO] DELETED AccountSubject - ${accountSubject.subjectName}`);
        res.status(200).send("accountSubject Deleted!!");
      }
    });
  });
});



module.exports = router;
