
const userModel = require('../Models/userModel')
let { random } = require('../utils/helper')

const register = async (req, res) => {

    try {

        if (Object.keys(req.body).length <= 0) {
            res.status(400).send({
                message: 'please provide public Address'
            })
        }

        let { pubAddress } = req.body
        let isUSerExist = await userModel.findOne({ pubAddress })

        if (isUSerExist) {
            return res.status(200).send({
                message: 'login successFul'
            })
        }

        let newUser = {
            userId : random(),
            pubAddress : pubAddress,
        }

        let createdUser = await userModel.create(newUser)
        return res.status(200).send({
            message : 'registration successFull',
            data : createdUser
        })


    } catch (error) {
        return res.status(500).send('internal server error')
    }

}



module.exports = {
    register
}