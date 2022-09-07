const jwt = require('jsonwebtoken')

const userModel = require('../Models/userModel')


const createToken = async (req, res) => {

    try {

        const { userId, pubAddress } = req.body;

        const user = await userModel.findOne({ userId, pubAddress })
        
        if (!user) return res.status(401).send({ status: false, msg: "Invalid Credential" })

        const token = jwt.sign({

            user: user._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
            "CRYPTO_EXCHANGE");

        console.log(token)

        res.Header("x-api-key", token)


    } catch (err) {

        console.log(err)
        return res.status(500).send({ status: false, msg: "Internal Server Error", data: MessageChannel.err })
    }
}
    module.exports = {
        createToken
    }

