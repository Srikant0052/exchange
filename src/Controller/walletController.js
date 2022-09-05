const walletModel = require("../Models/walletModel");
const { random } = require("../utils/helper");



const createWallet = async(req, res)=>{

try{
   
    if (Object.keys(req.body).length<0){

        return res.status(400).send({stattus:false, mas:"please provide valid wallet ttype"})
    }

    let {nameOfWallet}= req.body;

    let isnameOfWallet = await walletModel.findOne({nameOfWallet})

    if (isnameOfWallet){

        return res.status(200).send("wallet created")
    }

    let newWallet = {

        nameOfWallet:nameOfWallet,
        walletId:Number(random(4, ["0", "9"])),
        status:true,
    }

    let wallet = await walletModel.create(newWallet)

        return res.status(201).send({status:true, data:wallet})
    

}catch(error){
    console.log(error)
    return res.status(500).send("internal server error")
}

}


module.exports ={
    createWallet
}


