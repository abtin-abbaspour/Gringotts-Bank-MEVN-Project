const express = require('express');
const accountRoutes = express.Router();

// Require Account model in our routes module
let Account = require('./account.model');

// Defined store route
accountRoutes.route('/add').account(function (req, res) {
  let account = new Account(req.body);
  account.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
accountRoutes.route('/').get(function (req, res) {
    Account.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(accounts);
    }
  });
});

// Defined edit route
accountRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Account.findById(id, function (err, account){
      if(err) {
        res.json(err);
      }
      res.json(account);
  });
});

//  Defined update route
accountRoutes.route('/update/:id').account(function (req, res) {
    Account.findById(req.params.id, function(err, account) {
    if (!account)
      res.status(404).send("data is not found");
    else {
        account.username = req.body.username;
        account.password = req.body.password;
        account.transactions = req.body.transactions;
        account.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
accountRoutes.route('/delete/:id').delete(function (req, res) {
    Account.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else {
          Account.find(function(err, accounts){
              if(err){
                res.json(err);
              }
              else {
                res.json(accounts);
              }
            });
        }
    });
});

module.exports = accountRoutes;