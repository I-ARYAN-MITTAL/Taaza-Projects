const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3
    },
    PhoneNumber:{
        type:Number,
        required:true,
        min:10
    },
    Mail:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw Error('Invalid Email')
                }
        }
    },
    Password:{
        type:String,
        required: true
    },
    ConfirmPassword:{
        type:String,
        required:true
    },

})

const User = new mongoose.model("User",UserSchema);
module.exports= User;
