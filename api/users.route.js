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

    //if(errors){
        console.log(1);
        console.log(req.validationErrors());
        console.log(2);
    //    res.json({ errors:errors });
    //} else {
        let newUser = new User({
            username:username,
            email:email,
            password:password,
            isActive:true
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
    //}
});

// Login Form
router.get('/login', function(req, res){
    res.redirect('/');
});

// Login Process
router.post('/login', passport.authenticate('local'), function(req, res, next){
    req.user.isActive = true;
    console.log(req.user);
    });

// Logout
router.get('/logout', function(req, res){
    req.logout();
    req.user.isActive = false;
    req.flash('success', 'You are logged out');
    res.redirect('/users/login1');
});

router.get('/activeAccount', function(req, res){
    User.find({"isActive": true}, function(err, result){
        result.isActive = false;
        if(err)
            res.json(err);
        else
            res.json(result);
    });
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
    db.users.drop();
    if(err){
        res.json(err);
    }
    //db.collection.drop();
});

module.exports = router;