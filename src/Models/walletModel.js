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


}, { timestamps: true })

module.exports = mongoose.model("Wallet", walletSchema);