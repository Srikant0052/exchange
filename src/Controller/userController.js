const userModel = require('../Models/userModel')
const walletModel = require('../Models/walletModel')
let { random } = require('../utils/helper')

const register = async (req, res) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({
                status: 400,
                message: 'please provide public Address'
            })
        }

        let { pubAddress } = req.body
        let allUsers = await userModel.find()

        if (allUsers.map(e => e.pubAddress).includes(pubAddress)) {
            return res.status(200).send({
                status: 200,
                message: 'login successFul'
            })
        }

        let userId = Number(random(4, ["0", "9"]))

        allUsers.forEach(e => {
            if (e.userId == userId) {
                userId = Number(random(4, ["0", "9"]))
            }
        })

        let newUser = {
            userId,
            pubAddress
        }

        let resp = await userModel.create(newUser)
        resp = resp.toObject()
        delete resp._id
        delete resp.createdAt
        delete resp.updatedAt
        delete resp.__v

        return res.status(201).send({
            status: 201,
            message: 'registration successFull',
            data: resp
        })


    } catch (error) {

        console.log(error)
        return res.status(500).send({
            status: 500,
            message: 'internal server Error'
        })

    }

}


const addWallet = async (req, res) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({
                status: 400,
                message: "invalid input params"
            })
        }

        let { userId, walletId } = req.body

        let min = 1
        let max = walletModel.find().count()

        if (walletId < min || walletId > max) {
            return res.status(400).send({
                status: 400,
                message: "invalid wallet selection"
            })
        }

        let updatedData = await userModel.findOneAndUpdate(
            userId,
            {
                $addToSet: { wallets: { walletId } }
            },
            { new: true })

        return res.status(201).send({
            status: 201,
            message: 'Wallet added successfully',
            data: updatedData
        })


    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "internal server Error"
        })
    }

}

// const getWallet


module.exports = {
    register,
    addWallet
    // getWallet
}