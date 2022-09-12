const mongoose = require('mongoose');

const errorLog = mongoose.Schema({

    _id: Number,

    errMsg: {
        type: String
    },

    errCode: {
        type: Number
    },

    userIp: {
        type: String
    },

    onRoute: {
        type: String
    },
    
    timestamp: {
        type: String
    }

})

module.exports = mongoose.model('errorlog', errorLog);