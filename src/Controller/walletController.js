const walletModel = require("../Models/walletModel");
const CreateError = require('http-errors')



const createWallet = async (req, res,next) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            throw CreateError(400, `Please provide valid wallet type`)
        }

        let { nameOfWallet } = req.body;

        let isnameOfWallet = await walletModel.findOne({ nameOfWallet })

        if (isnameOfWallet) {
            return res.status(201).send({
                status: 201,
                message: "wallet created"
            })
        }

        let newWallet = {
            nameOfWallet: nameOfWallet,
            walletId: await walletModel.find().count() + 1,
            status: true,
        }

        let wallet = await walletModel.create(newWallet)

        return res.status(201).send({
            status: true,
            data: wallet
        })


    } catch (error) {
        next(error)
    }

}


module.exports = {
    createWallet
}


