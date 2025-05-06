const mongoose=require("mongoose")
const readyDesignSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    image_url:{
        type:String
    },
    defaultColors:{
        type:[String],
    },
    price:{
        type:Number,
        required:true
    },
    category:{       //enum?????????????????????//לעשות או לא 
        type:String
    },
    available:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

module.exports=mongoose.model('ReadyDesign',readyDesignSchema)