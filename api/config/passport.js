const LocalStrategy = require('passport-local').Strategy;
const User = require('../user');
const config = require('../config/DB');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
        // Match Username
        console.log(2);
        let query = {username:username};
        User.findOne(query, function(err, user){
            console.log(3);
            if(err) throw err;
            if(!user) {
                console.log("No user");
                return done(null, false, {message: 'Incorrect Username'});
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch) {
                    console.log(4);
                    return done(null, user);
                } else {
                    console.log(isMatch);
                    return done(null, false, {message: 'Incorrect Password'})
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        console.log(5);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log(8);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}