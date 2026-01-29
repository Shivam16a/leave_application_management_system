const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema({
    staffname:{
        type:String,
        required:true
    }
})