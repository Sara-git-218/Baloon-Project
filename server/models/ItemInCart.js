const mongoose = require("mongoose")
const fonts = require('./FontOptions');
const itemInCartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    cnt: {
        type: Number,
        default: 1
    },
    isDefaultColors: {
        type: Boolean,
        default: true

    },
    colorsIfNotDefault: {
        type: [String]
    },
    captionType: {
        type: String,
        enum:fonts,
        default: "Arial"
    },
    CaptionContent: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model('ItemInCart', itemInCartSchema)