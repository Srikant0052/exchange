const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    _id: Number,

    userId: {
        type: Number,
        unique: true
    },

    username: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    pubAddress: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    wallets: {
        type: Array
    },


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)