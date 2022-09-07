const userLoginModel = require('../Models/userLoginModel');

const userModel = require('../Models/userModel')

const userloginRecord = async(req, res)=>{

try{
     
     



}catch(err){
     console.log(err)
    return res.status(500).send({status:false, msg:"internal server error", data:MessageChannel.err})
}

}
module.exports ={
    userloginRecord
}