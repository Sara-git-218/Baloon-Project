const { kMaxLength } = require("buffer")
const mongoose=require("mongoose")
const { format } = require("path")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6 
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    phone:{
        type:String,
        required:true,
        maxLength:10
    },
    roles:{
        type:String,
        enum:['User', 'Admin'],
        default:"User",
        immutable:true
    },
    dateOfBirth:{
        type:mongoose.Schema.Types.Date,
        // format:("dd-MM-yyyy")
    }

},{timestamps:true})

module.exports=mongoose.model('User',userSchema)