const mongoose = require('mongoose')


const transactionModel = new mongoose.Schema({

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

    walletId: {
        type: Number,
        ref: 'Wallet'
    },

    txType: {
        type: String,
        enum: ['credit', 'debit']
    },

    getWay: {
        type: String
    }
});


module.exports = mongoose.model('Transaction', transactionModel);