const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);