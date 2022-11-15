
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

    userName: {
        type: String
    },

    gamesPlayed: {
        type: Number
    },

    totalWins: {
        type: Number
    },

    totalLose: {
        type: Number
    }

}, { timestamps: true })

module.exports = model('Games', gamesScheme)

