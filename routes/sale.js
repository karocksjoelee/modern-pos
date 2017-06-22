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
  let sale = new Sale({
    orderDate: req.body.orderDate,
    buyer: req.body.buyer,
    phone: req.body.phone,
    serveWay: req.body.serveWay,
    deliverDateTime: req.body.deliverDateTime,
    deliverBuildingAddress: req.body.deliverBuildingAddress,
    items: req.body.items,
    tags: req.body.tags,
    total: req.body.total,
    note: req.body.note,
    weather: req.body.weather,
    tempture: req.body.tempture
  });

  sale.save((err, sale) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(sale);
    }
  });

});


router.get('/(:id)?', (req, res) => {

  if (!req.params.id) {
    // if doesn't provide id in url params , return all 
    Sale.find({})
      .populate("Member")
      .exec((err, sale) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(sale);
        }
      });

  } else {
    // Or get item by id 
    Sale.find({
        _id: req.params.id
      })
      .populate("Memeber")
      .exec((err, sale) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(sale);
        }
      });
  }

});


router.get('/byDate/:date', (req, res) => {
  let year = req.params.date.slice(0, 4);
  let month = req.params.date.slice(4, 6);
  let date = year + "-" + month;
  Sale.find({
    orderDate: {
      $regex: date
    }
  }, (err, sale) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(sale);
    }
  });

});


router.put('/:id', (req, res) => {
  // Find specific item of id and update it .
  // Object will be in req.body 
  Sale.findOne({
    _id: req.params.id
  }, (err, sale) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    sale.orderDate = req.body.orderDate || sale.orderDate;
    sale.buyer = req.body.buyer || sale.buyer;
    sale.phone = req.body.phone || sale.phone;
    sale.serveWay = req.body.serveWay || sale.serveWay;
    sale.deliverDateTime = req.body.deliverDateTime || sale.deliverDateTime;
    sale.deliverBuildingAddress = req.body.deliverBuildingAddress || sale.deliverBuildingAddress;
    sale.items = req.body.items || sale.items;
    sale.tags = req.body.tags || sale.tags;
    sale.total = req.body.total || sale.total;
    sale.note = req.body.note || sale.note;
    sale.weather = req.body.weather || sale.weather;
    sale.tempture = req.body.tempture || sale.tempture;

    sale.save((err, sale) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(sale);
      }
    });
  });

});


router.delete('/:id', (req, res) => {
  Sale.findOne({
    _id: req.params.id
  }, (err, sale) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    sale.remove((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("Sale Deleted!!");
      }
    });
  });
  res.status(200).send('Sale.orderDate , Sale.buyer Deleted');
});



module.exports = router;
