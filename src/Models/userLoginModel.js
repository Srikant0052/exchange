const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    Desc:{
        type:String
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
    }


}, { timestamps: true })

module.exports = mongoose.model('UserLogin', loginSchema)