const mongoose = require('mongoose');

const UserSchema =  mongoose.Schema({
    name: {
        type: String,
        maxLength:50
    },
    email : {
        type: String,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        minLength:5
    },
    lastName: {
        type: String,
        maxLength:50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
});

exports.User =  mongoose.model('User', UserSchema);
