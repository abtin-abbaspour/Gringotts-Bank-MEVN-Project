const express = require('express');
const currencyRoutes = express.Router();


// Require Currency model in our routes module
let Currency = require('./currency.model');


currencyRoutes.route('/initializeAll').post(function (req, res){
    Currency.find(function(err, currencies){
    if(err){
      res.json(err);
    } else if(currencies.length === 0){
      var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

      // const fetch = require("node-fetch");
      // fetch('./currencies.json')
      // .then((response) => {
      //   return response.json();
      // })
      // .then((data) => {
      //   for(var curr of data.currencies){
      //     arr.push(new Currency({name: curr.name, value: curr.value, date: date}));
      //   }
      // }).catch(() => {
      //   res.status(400).send("JSON parsing error.");
      // });//retrieved from JSON file


      // var data;
      // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      // var xmlhttp = new XMLHttpRequest();
      // xmlhttp.onreadystatechange = function() {
      //   if (this.readyState == 4 && this.status == 200) {
      //     data = JSON.parse(this.responseText);
      //   }
      // };
      // xmlhttp.open("GET", "./currencies.json", true);
      // xmlhttp.send()
      // for(var curr of data.currencies){
      //     arr.push(new Currency({name: curr.name, value: curr.value, date: date}));
      // }

      var arr = new Array(new Currency({name: "$CAD", value: 1.00, date: date}),
      new Currency({name: "$USD", value: 1.4203557, date: date}),
      new Currency({name: "€EURO", value: 1.535115, date: date}),
      new Currency({name: "£GBP", value: 1.741817, date: date}),
      new Currency({name: "¥JPY", value: 0.013094, date: date}));

      try{
        for(var a of arr){
          a.save();
        }
        res.status(200).send("Initialized currencies to database");
      } catch (err){
        res.status(400).send("unable to save collection to database");
      }
    } else{
      res.status(204).send("Database currencies already initialized");
    }
  });
});


// Defined get data(index or listing) route
currencyRoutes.route('/').get(function (req, res) {
    Currency.find(function(err, currencies){
    if(err){
      res.json(err);
    }
    else {
      res.json(currencies);
    }
  });
});


/*
// Defined store route
currencyRoutes.route('/add').post(function (req, res) {
  let currency = new Currency(req.body);
  currency.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});



// Defined edit route
currencyRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Currency.findById(id, function (err, currency){
      if(err) {
        res.json(err);
      }
      res.json(currency);
  });
});

//  Defined update route
currencyRoutes.route('/update/:id').post(function (req, res) {
    Currency.findById(req.params.id, function(err, currency) {
    if (!currency)
      res.status(404).send("data is not found");
    else {
        currency.name = req.body.name;
        currency.value = req.body.value;
        currency.date = req.body.date;
        currency.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
currencyRoutes.route('/delete/:id').delete(function (req, res) {
    Currency.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else {
          Currency.find(function(err, currencies){
              if(err){
                res.json(err);
              }
              else {
                res.json(currencies);
              }
            });
        }
    });
});*/

module.exports = currencyRoutes;