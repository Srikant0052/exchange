const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

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

    isActive: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model("userWallet", walletSchema);