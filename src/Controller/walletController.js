const walletModel = require("../Models/walletModel");
const userModel = require('../Models/userModel')
const CreateError = require('http-errors')



const createWallet = async (req, res, next) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            throw CreateError(400, `Please provide valid wallet type`)
        }

        let { nameOfWallet, shortName, logo, network, networkLink } = req.body;

        let isnameOfWallet = await walletModel.findOne({ shortName })

        if (isnameOfWallet) {
            return res.status(201).send({
                status: 201,
                message: "wallet created"
            })
        }

        let newWallet = {
            nameOfWallet: nameOfWallet,
            walletId: await walletModel.find().count() + 1,
            logo: logo,
            shortName: shortName,
            network: network,
            networkLink: networkLink,
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

const getWallet = async (req, res, next) => {

    try {

        let loggedInUser = req['loggedInUser']['_id']
        let userById = await userModel.findById(loggedInUser).lean()
        let allcoins = await walletModel.find().lean()
        let userWallets = userById[`wallets`]

        if (!allcoins) {
            throw CreateError(500, 'unable to fetch Data at These Moment Please try Letter')
        }

        allcoins.forEach(e => {

            userWallets.forEach(x => {

                if (x['nameOfWallet'] === e['nameOfWallet']) {
                    e['balance'] = x['balance']
                }

            })

        })

        let finalData = allcoins.sort((a) => a['balance'] === null ? 1 : -1)
        
        return res.status(200).send(finalData)

    }

    catch (error) {
        console.log(error)
        next(error)
    }

}



module.exports = {
    createWallet,
    getWallet
}


