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

    balance:{
        type:Number,
        required:true
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

    transactionNumber: {
        type: String,
        unique: true,
    },

    transactionTime: {
        type: Number,
        default: unixTime = function unixTimestamp() {
            return Math.floor(
                Date.now() / 1000
            )
        }
    },
    status:{

        type:String,
        enum:["Success","Fail","Pending"],
        default: "Pending"

    },

    walletType: {
        type: Number,
        ref: 'Wallet'
    }
});


module.exports = mongoose.model('Transaction', transactionModel);