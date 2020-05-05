const express = require('express');
const router = express.Router();

// Bring in the User Model
let User = require('./user');

// Register Form
router.get('/login', function(req, res){
    res.render('login');
});

module.exports = router;