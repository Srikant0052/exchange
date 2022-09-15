const { verify } = require('jsonwebtoken')
const CreateError = require('http-errors')

const protected = async (req, res, next) => {

    try {

        const token = (req.headers['accessToken'] || req.headers['accesstoken'])
        
        if (!token) {
            throw CreateError.Unauthorized('please Provide Token In Header')
        }

        const decodedToken = verify(token, "secretKey")
        req['loggedInUser'] = decodedToken
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    protected
}

