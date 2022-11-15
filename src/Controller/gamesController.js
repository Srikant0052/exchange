
const gamesModel = require('../Models/gamesModel/gamesModel')
const userModel = require('../Models/userModel')



const addGame = async (req, res, next) => {

    try {

        const userId = req.params.id
        const isUserExist = await userModel.findById(userId).lean().select({ name: 1, lastname: 1 })

        if (!isUserExist) {
            throw CreateError(404, `unable to Fetch details..`)
        }

        console.log(isUserExist)


    } catch (error) {
        next(error)
    }

}

module.exports = {
    addGame
}