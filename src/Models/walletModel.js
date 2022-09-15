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

    shortName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    logo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    network: {
        type: String,
        required: true,
        trim: true
    },

    networkLink: {
        type: String,
    },

    balance: {
        type: Number,
        default: null
    }


}, { timestamps: true })

module.exports = mongoose.model("Wallet", walletSchema);