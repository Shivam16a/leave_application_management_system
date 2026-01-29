const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    prn:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"],
    },
    session:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
},{timestamt:true});

const User = mongoose.model("User",userSchema);
module.exports = User;