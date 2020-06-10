const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in the User Model
let User = require('./user');

// Register Form
router.get('/register', function(req, res){
    res.send('register');
});

router.get('/', (req, res)=>{
    User.find(function(err, users){
    if(err){
      res.json(err);
    }
    else {
      res.json(users);
    }
  });
});

// Register Process
router.post('/register', function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);
    
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();

    let errors = req.validationErrors();
    console.log(req.validationErrors());

    let query = {username:username};
    User.findOne(query, function(err, user){
        console.log(err);
        console.log(user);
        if(err){
            console.log(err)
        } else if (user) {
            console.log("Error: That username already exists");
            res.status('505').send('Username already exists');
        } else {
            let newUser = new User({
                username:username,
                email:email,
                password:password,
                balance:100
            });    
            console.log(3);
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err){
                        console.log(err);
                    }

                    newUser.password = hash;
                    newUser.save(function(err){
                        if(err) {
                            console.log(err);
                            return;
                        } else {
                            req.flash('success', 'You are now registered and can log in');
                            console.log(4);
                            console.log(newUser);
                            res.json('success');
                            //res.redirect('/users/login');
                        }
                    });
                });
            });
        }
    });
});

// Login Form
router.get('/login', function(req, res){
    res.redirect('/');
});

// Login Process
router.post('/login', passport.authenticate('local', { failureFlash: true }), function(req, res, next){
    console.log(req);
    console.log(res);
    console.log(next);
    req.flash('success', 'You are logged in');
});

// Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
});

//we need a delete method

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else {
          User.find(function(err, users){
              if(err){
                res.json(err);
              }
              else {
                res.json(users);
              }
            });
        }
    });
}); 

router.delete('/deleteAll', (req, res)=>{
    User.collection.deleteMany({});
});

module.exports = router;