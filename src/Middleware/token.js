const { verify } = require('jsonwebtoken')
const CreateError = require('http-errors')

const verifyjwt = async (req, res, next) => {

    try {

        const token = req.cookies;

        if (!token) {
            throw CreateError[401]
        }
        
        const decodedToken = verify(token, "secret-key")
        req['loggedInUser'] = decodedToken['userByPubId']
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyjwt
}

