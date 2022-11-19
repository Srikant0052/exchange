const mongoose = require("mongoose")
const otpSchema = new mongoose.Schema({

    email: {
        type: String
    },

    code: {
        type: String
    },

    expireIn: {
        type: Number
    }

}, { timestamps: true })

module.exports = mongoose.model("Otp", otpSchema)