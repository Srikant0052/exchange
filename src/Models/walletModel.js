const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

    nameOfWallet: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },

    walletId: {
        type: Number,
        required: true,
        unique: true,
        trim: true

    },

    status: {
        type: Boolean,
        default: false
    },




}, { timestamps: true })

module.exports = mongoose.model("Wallet", walletSchema);