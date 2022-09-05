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
<<<<<<< HEAD

    balance:{
        type:Number,
        required:true
=======
    balance: {
        type: Number,
        required: true
>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
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
<<<<<<< HEAD
    status:{

        type:String,
        enum:["Success","Fail","Pending"],
=======
    status: {
        type: String,
        enum: ["Success", "Fail", "Pending"],
>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
        default: "Pending"

    },

    walletType: {
        type: Number,
        ref: 'Wallet'
    }
});


module.exports = mongoose.model('Transaction', transactionModel);