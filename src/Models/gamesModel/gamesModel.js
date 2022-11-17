
const { Schema, model } = require('mongoose')

const gamesScheme = new Schema({

    userId: {
        type: Number,
        ref: 'User'
    },

    name: {
        type: String,
    },

    lastName: {
        type: String,
    },

    betAmount : {
        type : Number
    },

    dealerCount: {
        type: Number,
    },

    playerCount: {
        type: Number,
    },
    
    result : {
        type : String
    }

}, { timestamps: true })

module.exports = model('Games', gamesScheme)

