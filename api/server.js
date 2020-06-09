const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const expressValidator = require('express-validator');
app.use(expressValidator())
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose'); 
const passport = require('passport');
const config = require('./config/DB.js');
const transactionRoute = require('./transaction.route');
const currencyRoute = require('./currency.route');
const usersRoute = require('./users.route');

app.set('view engine', 'jade');

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

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


require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRoute);

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});