const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

    userId: {
        type: Number,
        required: true,
        ref: 'User'
    },

    Desc: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    IP: {
        type: String
    },

    loggedInAt: {

        type: Date,
        default: Date.now()
    },

    loggedOutAt: {

        type: Date,
        default: Date.now()
    },

    tokenId: {
        type: String,
        default: 0
    },

    tokenSecret: {
        type: String,
        default: 0
    },

    tokenExpire: {
        type: Boolean,
        default: false
    },
    
    device: {
        type: String
    }


}, { timestamps: true })

module.exports = mongoose.model('UserLogin', loginSchema)