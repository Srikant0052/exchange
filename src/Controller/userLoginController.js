


const userloginRecord = async(req, res)=>{

try{
     
     console.log(req.ip, req.url, req.method, req.hostname)



}catch(err){
     console.log(err)
    return res.status(500).send({status:false, msg:"internal server error", data:MessageChannel.err})
}

}
module.exports ={
    userloginRecord
}