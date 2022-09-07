const userLoginModel = require('../Models/userLoginModel');

const userlogin = async (req, res) => {

    try {

    } catch (err) {

        return res.status(500).send({ status: false, msg: "internal server error", data: MessageChannel.err })
    }

}
module.exports = {
    userlogin
}