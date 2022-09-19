const mongoose = require('mongoose')


const creditModel = new mongoose.Schema({

    userId: {
        type: Number,
        ref: 'User'
    },

    credit: {
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
        type: String
    },

    walletType: {
        type: Number,
        ref: 'Wallet'
    }
});


module.exports = mongoose.model('Credit', creditModel);