const mongoose = require("mongoose");
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
    customDesign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomDesign'
    },
    cnt: {
        type: Number,
        default: 1,
        min: 1
    },
    isDefaultColors: {
        type: Boolean,
        default: true
    },
    colorsIfNotDefault: {
        type: [String],
        validate: {
            validator: function (arr) {
                return Array.isArray(arr) && arr.every(c => typeof c === 'string');
            },
            message: 'colorsIfNotDefault must be an array of strings'
        }
    },
    captionType: {
        type: String,
        enum: fonts,
        default: "Arial"
    },
    CaptionContent: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('ItemInCart', itemInCartSchema);
