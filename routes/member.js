// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Member = require('../models/member');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let member = new Member({
    name: req.body.name,
    birthday: req.body.birthday,
    since: req.body.since,
    line: req.body.line,
    facebook: req.body.facebook,
    email: req.body.email,
    homeBuilding: req.body.homeBuilding,
    homeAddress: req.body.homeAddress,
    officeBuilding: req.body.officeBuilding,
    officeAddress: req.body.officeAddress,
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,
    tags: req.body.tags,
    membershipTerm: req.body.membershipTerm,
    memberStatus: req.body.memberStatus,
    unExchanged: req.body.unExchanged,
    exchanged: req.body.exchanged,
    orderHistories: req.body.orderHistories
  });

  member.save((err, member) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(member);
    }
  });
});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    res.status(200).send('All Members');
  } else {
    // Or get item by id 
    res.status(200).send('Members By Id');
  }

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  res.status(201).send('Updated Member');
});


router.delete('/:id', (req, res) => {
  res.status(200).send('Member.name Deleted');
});



module.exports = router;
