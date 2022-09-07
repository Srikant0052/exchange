const jwt = require('jsonwebtoken')

const verifyjwt = async (req, res, next)=>{

    try{
        const token = req.cookies;

        if (!token) return res.status(401).send({status:false, msg:"Unauthorize user"})

        const decodedToken = jwt.verify(token, "secret-key")
        req.user = decodedToken
          next()
    }catch(error){

        console.log(error)
        return res.status(500).send({status:false, msg:"Internal Server Error", data:MessageChannel.error})
    }
}

module.exports={
    verifyjwt
}

