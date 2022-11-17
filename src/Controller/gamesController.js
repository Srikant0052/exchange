
const gamesModel = require('../Models/gamesModel/gamesModel')
const userModel = require('../Models/userModel')



const addGame = async (req, res, next) => {

    try {

        const userId = req.params.id
        const isUserExist = await userModel.findById(userId).lean().select({ name: 1, lastname: 1 })

        if (!isUserExist) {
            throw CreateError(404, `unable to Fetch details..`)
        }


        let finalData = {

            userId: isUserExist['_id'],
            name: isUserExist['name'],
            lastName: isUserExist['lastname'],
            ...req.body

        }

        const dbResp = await gamesModel.create(finalData)
        if (!dbResp) {
            throw CreateError(500, `something went Wrong`)
        }

        return res.status(201).send({
            message: `Success`,
            error: null,
            data: dbResp
        })



    } catch (error) {
        next(error)
    }

}

const getData = async (req, res, next) => {

    try {

        let alldata = await gamesModel.find().sort({ createdAt: -1 })
        return res.status(200).send({
            error: null,
            data: alldata
        })

    } catch (error) {
        next(error)
    }
}

const getUserBets = async (req, res, next) => {

    try {

        let id = req.params.id
        let alldata = await gamesModel.find({ userId: id }).sort({ createdAt: -1 })

        console.log(alldata)
        
        return res.status(200).send({
            error: null,
            data: alldata
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addGame,
    getData,
    getUserBets
}