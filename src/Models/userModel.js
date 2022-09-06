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

    isActive: {
        type: Boolean,
        default: true
    },

    wallets : 
        {   
            type : Array,
            _id : false,
            walletId : Number,
            ref : 'Wallet'

        }
    
    

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)