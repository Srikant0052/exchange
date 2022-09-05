const userModel = require('../Models/userModel')
let { random } = require('../utils/helper')

const register = async (req, res) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({
                message: 'please provide public Address'
            })
        }

        let { pubAddress } = req.body
        let isUSerExist = await userModel.findOne({ pubAddress: pubAddress })

        if (isUSerExist) {
            return res.status(200).send({
                message: 'login successFul'
            })
        }

        let userId = Number(random(4, ["0", "9"]))

        let newUser = {
            userId,
            pubAddress,
            wallets : Number(wallets)
        }

        let resp = await userModel.create(newUser)
        
        return res.status(200).send({
            message: 'registration successFull',
            data: createdUser
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send('internal server error')

    }

}



module.exports = {
    register
}