const mongoose = require('mongoose')


const allTransactionModel = new mongoose.Schema({

    userId: {
        type: Number,
        ref: 'User'
    },

    credit: {
        type: Number,
        required: true,
        default: 0
    },

    debit: {
        type: Number,
        required: true,
        default: 0
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    transactionId: {
        type: String,
        unique: true
    },

    publicAddress: {
        type: String,
    },

    transactionHash: {
        type: String,
        required: true
    },

    transactionTime: {
        type: Number,
        default: unixTime = function unixTimestamp() {
            return Math.floor(
                Date.now() / 1000
            )
        }
    },
    status: {

        type: String,
        enum: ["Success", "Fail", "Pending"],
        default: "Pending"

    },

    walletType: {
        type: Number,
        ref: 'Wallet'
    }
});


module.exports = mongoose.model('AllTransaction', allTransactionModel);