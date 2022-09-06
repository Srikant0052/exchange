const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

    userId: {
        type: Number,
        ref: 'User'
    },

    balance : {
        type : Number,
        default : 0
    },

    credit : {
        type : Number,
        default : 0
    },

    debit : {
        type : Number,
        default : 0
    },

    nameOfWallet: {

        type: String,
        required: true,
        unique: true,
        trim: true

    },

    walletId: {

        type: Number,
        required: true,
        unique: true,
        trim: true

    },

    isActive: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model("userWallet", walletSchema);