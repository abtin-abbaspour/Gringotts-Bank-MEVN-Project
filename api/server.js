const express = require('express');
const app = express();
const expressValidator = require('express-validator');
app.use(expressValidator())
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose'); 
const config = require('./DB.js');
const transactionRoute = require('./transaction.route');
const currencyRoute = require('./currency.route');
const usersRoute = require('./users.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/transactions', transactionRoute);
app.use('/currencies', currencyRoute);

app.use('/users', usersRoute)

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});