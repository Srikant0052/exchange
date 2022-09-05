const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

nameOfWallet :{

    type:string,
    required:true,
    unique:true,
    trim:true

},

walletId :{

    type:Number,
    required:true,
    unique:true,
    trim:true
},

status:{

    type:Boolean,
    default:false
},




},{timestamps:true})

module.exports = mongoose.model("Wallet", walletSchema);