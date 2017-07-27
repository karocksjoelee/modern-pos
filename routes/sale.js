// Module Dependencies 
// ==========================================================================================
const express = require('express');
const router = express.Router();
const cm = require('../utility/common-module.js');

// Mongo Schema 
const Sale = require('../models/sale');


// RESTful API 
// ==========================================================================================
router.post('/', (req, res) => {
  // Accept an Object according to schema 
  // Object will be in req.body
  let sale = new Sale({
    createDate: req.body.createDate,
    lastUpdateDate: req.body.lastUpdateDate,
    buyer: req.body.buyer,
    buyerName: req.body.buyerName,
    type: req.body.type,
    phone: req.body.phone,
    serveWay: req.body.serveWay,
    deliverDateTime: req.body.deliverDateTime,
    deliverPeriod: req.body.deliverPeriod,
    deliverAddress: req.body.deliverAddress,
    deliverBuilding: req.body.deliverBuilding,
    orderedItems: req.body.orderedItems,
    orderedMealSets: req.body.orderedMealSets,
    tags: req.body.tags,
    total: req.body.total,
    note: req.body.note,
    weather: req.body.weather,
    tempture: req.body.tempture,
    beenDelivered: req.body.beenDelivered,
    maketingProgram: req.body.maketingProgram,
    buyerDiscount: req.body.buyerDiscount,
    businessMemberPoint: req.body.businessMemberPoint,
    orderCode: req.body.orderCode
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
      .populate("buyer")
      .exec((err, sale) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          cm.logSuc(`[MONGO] GOT ALL SALES - ${sale.length}`);
          res.status(200).send(sale);
        }
      });

  } else {
    // Or get item by id 
    Sale.find({
        _id: req.params.id
      })
      .populate('orderedItems.itemId')
      .populate('orderedMealSets.mealSetId')
      .populate("buyer")
      .exec((err, sale) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          cm.logSuc(`[MONGO] GOT SALE - ${sale[0]._id} , Matched : ${sale.length}`);
          res.status(200).send(sale);
        }
      });
  }

});


router.get('/preorderByDate/:date', (req, res) => {
  let year = req.params.date.slice(0, 4);
  let month = req.params.date.slice(4, 6);
  let day = req.params.date.slice(6,8);
  let date = year + '/' + month + '/' + day;

  Sale.find({
    deliverDateTime: {
      $regex: date
    }
  })
  .populate('orderedItems.itemId')
  .populate('orderedMealSets.mealSetId')
  .populate('buyer')
  .exec((err, sales) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      const preOrdered = sales.filter((sale) => {
        return sale.type === 'pre-order';
      });
      cm.logSuc(`[MONGO] ${date} Pre-Order - ${preOrdered.length} Sales`);
      res.status(200).send(preOrdered);
    }
  });

});


router.get('/onsiteByDate/:date', (req, res) => {
  let year = req.params.date.slice(0, 4);
  let month = req.params.date.slice(4, 6);
  let day = req.params.date.slice(6,8);
  let date = year + '/' + month + '/' + day;

  Sale.find({
    deliverDateTime: {
      $regex: date
    }
  })
  .populate('orderedItems.itemId')
  .populate('orderMealSets.mealSetId')
  .populate('buyer')
  .exec((err, sales) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      const onsiteOrder = sales.filter((sale) => {
        return sale.type === 'on-site';
      });
      cm.logSuc(`[MONGO] ${date} On-site - ${onsiteOrder.length} Sales`);
      res.status(200).send(onsiteOrder);
    }
  });


});


router.put('/:id', (req, res) => {
  console.log(req.body);
  // Find specific item of id and update it .
  // Object will be in req.body 
  Sale.findOne({
    _id: req.params.id
  }, (err, sale) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    sale.createDate = req.body.orderDate;
    sale.lastUpdateDate = req.body.lastUpdateDate;
    sale.buyer = req.body.buyer;
    sale.buyerName = req.body.buyerName;
    sale.type = req.body.type;
    sale.phone = req.body.phone;
    sale.serveWay = req.body.serveWay;
    sale.deliverDateTime = req.body.deliverDateTime;
    sale.deliverPeriod = req.body.deliverPeriod;
    sale.deliverAddress = req.body.deliverBuildingAddress;
    sale.deliverBuilding = req.body.deliverBuilding;
    sale.orderedItems = req.body.orderedItems;
    sale.orderedMealSets = req.body.orderedMealSets;
    sale.tags = req.body.tags;
    sale.total = req.body.total;
    sale.note = req.body.note;
    sale.weather = req.body.weather;
    sale.tempture = req.body.tempture;
    sale.beenDelivered = req.body.beenDelivered;
    sale.maketingProgram = req.body.maketingProgram;
    sale.buyerDiscount = req.body.buyerDiscount;
    sale.businessMemberPoint = req.body.businessMemberPoint;
    sale.orderCode = req.body.orderCode;
  
    sale.save((err, sale) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        cm.logSuc(`[MONGO] UPDATED - ${sale._id}`);
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
        cm.logWarn(`[MONGO] DELETED - ${sale.phone} : $${sale.total}`);
        res.status(200).send(sale);
      }
    });
  });
});



module.exports = router;
