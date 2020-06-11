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
            if(err) return done(err);
            if(!user) {
                console.log(4);
                console.log("No User Found");
                return done("incorrect user", false, {message: 'Incorrect Username'});
            }
            console.log("User Found");
            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                console.log(5);
                if(err) return done(err);
                if(isMatch) {
                    console.log(6);
                    return done(null, user);
                } else {
                    console.log("Incorrect Password Found");
                    return done("incorrect pass", false, {message: 'Incorrect Password'})
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        console.log(7);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log(8);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}