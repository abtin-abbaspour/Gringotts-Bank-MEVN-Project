const express = require('express');
const transactionRoutes = express.Router();

// Require Transaction model in our routes module
let Transaction = require('./transaction.model');

// Defined store route
transactionRoutes.route('/add').post(function (req, res) {
  let transaction = new Transaction(req.body);
  transaction.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
transactionRoutes.route('/').get(function (req, res) {
    Transaction.find(function(err, transactions){
    if(err){
      res.json(err);
    }
    else {
      res.json(transactions);
    }
  });
});

// Defined edit route
transactionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Transaction.findById(id, function (err, transaction){
      if(err) {
        res.json(err);
      }
      res.json(transaction);
  });
});

//  Defined update route
transactionRoutes.route('/update/:id').post(function (req, res) {
    Transaction.findById(req.params.id, function(err, transaction) {
    if (!transaction)
      res.status(404).send("data is not found");
    else {
        transaction.amount = req.body.amount;
        transaction.transactionType = req.body.transactionType;
        transaction.eTransferTo = req.body.eTransferTo;
        transaction.date = req.body.date;
        transaction.time =req.body.time;
        transaction.balanceAfter = req.body.balanceAfter;
        transaction.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
transactionRoutes.route('/delete/:id').delete(function (req, res) {
    Transaction.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else {
          Transaction.find(function(err, transactions){
              if(err){
                res.json(err);
              }
              else {
                res.json(transactions);
              }
            });
        }
    });
});

module.exports = transactionRoutes;