const mongoose=require("mongoose")

const itemInCartSchema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    readyDesign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReadyDesign'
    },
    // //or
    // customDesign_id: {
    //     type: mongoose.Schema.Types.ObjectId,server/models/ItemInCart.js
    //     ref: 'CustomDesign'
    // },
    cnt:{
        type:Number,
        default:1
    },
    captionType:{
        type:String,
        enum:["Ariel","Guttman Yad-Light"],
        default:"Guttman Yad-Light"
    },
    CaptionContent:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model('ItemInCart',itemInCartSchema)