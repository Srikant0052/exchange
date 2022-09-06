const mongoose = require('mongoose');

const errorLog = mongoose.Schema({

    errMsg: {
        type: String
    },

    errCode: {
        type: Number
    },

    

}, { timestamps: true })

module.exports = mongoose.model('errorLog', errorLog);