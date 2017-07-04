// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();

// Mongo Schema 
const Member = require('../models/member');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {

  console.log('TESTTTT', req.body.homeBuilding);
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
    Member.find({})
      .populate('Buildings')
      .populate("Sale")
      .exec((err, member) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(member);
        }
      });

  } else {
    // Or get item by id 
    Member.findOne({
        _id: req.params.id
      })
      .populate('Buildings')
      .populate("Sale")
      .exec((err, member) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(member);
        }
      });
  }

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Member.findOne({
    _id: req.params.id
  }, (err, member) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    member.name = req.body.name || member.name;
    member.birthday = req.body.birthday || member.birthday;
    member.since = req.body.since || member.since;
    member.line = req.body.line || member.line;
    member.facebook = req.body.facebook || member.facebook;
    member.email = req.body.email || member.email;
    member.homeBuilding = req.body.homeBuilding || member.homeBuilding;
    member.homeAddress = req.body.homeAddress || member.homeAddress;
    member.officeBuilding = req.body.officeBuilding || member.officeBuilding;
    member.officeAddress = req.body.officeAddress || member.officeAddress;
    member.gender = req.body.gender || member.gender;
    member.weight = req.body.weight || member.weight;
    member.height = req.body.height || member.height;
    member.tags = req.body.tags || member.tags;
    member.membershipTerm = req.body.membershipTerm || member.membershipTerm;
    member.memberStatus = req.body.memberStatus || member.memberStatus;
    member.unExchanged = req.body.unExchanged || member.unExchanged;
    member.exchanged = req.body.exchanged || member.exchanged;
    member.orderHistories = req.body.orderHistories || member.orderHistories;

    member.save((err, member) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(member);
      }
    });
  });

});


router.delete('/:id', (req, res) => {
  Member.findOne({
    _id: req.params.id
  }, (err, member) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    member.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("Member Deleted!!");
      }
    });
  });
  res.status(200).send('Member.name Deleted');
});



module.exports = router;
