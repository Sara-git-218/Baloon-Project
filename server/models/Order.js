const mongoose = require("mongoose")
const { kMaxLength } = require("buffer")
const { type } = require("os")

const orderSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'ItemInCart',
        required:true
    },
    valid:{
        type:String,
        enum:["לא אושר","אושר","נשלח","נמסר"],
        default:"לא אושר"
    },
    deliveryDate:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    notes:{
        type:String,
        maxLength:200    
    },
    paymentMethod:{
        type:String,
        enum:["העברה בנקאית","מזומן"],
        required:true
    },
    paid:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

module.exports=mongoose.model('Order',orderSchema)
