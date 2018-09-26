const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
}));

function validateUser(user){
    const Schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user,Schema);
}

exports.User = User;
exports.Validate = validateUser;