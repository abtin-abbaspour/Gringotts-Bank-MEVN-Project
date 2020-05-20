const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Bring in the User Model
let User = require('./user');

// Register Form
router.get('/register', function(req, res){
    res.render('register');
});

// Register Process
router.post('/register', function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log('register process');
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors:errors
        });
    } else {
        let newUser = new User({
            username:username,
            email:email,
            password:password
        });    
        
        bcrypt.getSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(error){
                    console.log(err);
                }

                newUser.password = hash;
                newUser.save(function(err){
                    if(error) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/user/login1')
                    }
                });
            });
        });
    }
});

module.exports = router;