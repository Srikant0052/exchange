const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userId: {
        type: Number,
        required: true,
        unique: true
    },

    pubAddress: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: true
    },

    wallets : {
        type : Number,
        ref : 'Wallet',
        default : null
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)