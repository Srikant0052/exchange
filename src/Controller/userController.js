const userModel = require('../Models/userModel')
const walletModel = require('../Models/walletModel')
let { random } = require('../utils/helper')
let { sign } = require('jsonwebtoken')
let { isValidRequestBody, isValid } = require('../utils/validator')
const CreateError = require('http-errors')



const register = async (req, res, next) => {

    try {

        if (!isValidRequestBody(req.body)) {
            throw CreateError(400, 'invalid request Parameters')
        }

        let _id;

        let { pubAddress, email, password } = req.body

        if (!pubAddress || pubAddress.length < 42) {
            throw CreateError(400, 'Please Provide a valid public address')
        }

        if (!email || !password) {
            throw CreateError(400, `Email and password is required`)
        }

        let allUsers = await userModel.find()
        let userByPubId = allUsers.find(e => e.pubAddress == pubAddress || e.email == email)

        if (userByPubId) {
            res.status(409)
            res.json({
                message: `User Is Already Registered`
            })
        }

        // if (userByPubId) {

        //     let token = sign({ userByPubId }, "secretKey", { expiresIn: '1h' })
        //     return res.status(200).send({
        //         status: 200,
        //         message: 'login successFul',
        //         Token: token
        //     })

        // }

        let userId = Number(random(4, ["0", "9"]))

        allUsers.forEach(e => {
            if (e.userId == userId) {
                userId = Number(random(4, ["0", "9"]))
            }
        })

        _id = allUsers.length + 1

        let newUser = {
            _id,
            userId,
            pubAddress,
            email,
            password
        }

        let resp = await userModel.create(newUser)

        resp = resp.toObject()
        delete resp.createdAt
        delete resp.updatedAt
        delete resp.__v

        return res.status(201).send({

            status: 201,
            message: 'registration successFull',
            data: resp

        })


    } catch (error) {
        next(error)
    }

}

const Login = async (req, res, next) => {

    try {

        if (!isValidRequestBody(req.body)) {
            throw CreateError(400, 'invalid request Parameters')
        }

        console.log(req.body)

        let { email, password } = req.body

        if (!email || !password) {
            throw CreateError(400, `Please Enter Valid Credintials`)
        }

        let isUserExist = await userModel.findOne({ email: email }).select({
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })

        if (!isUserExist) {
            throw CreateError(404, `user not found please cheack credintials`)
        }

        console.log(isUserExist)

        let token = sign({ ...isUserExist._doc }, "secretKey", { expiresIn: '1h' })

        return res.status(200).send({
            status: 200,
            message: 'login successFul',
            token: token
        })

    } catch (error) {
        next(error)
    }

}


const addWallet = async (req, res, next) => {

    try {

        if (!isValidRequestBody(req.body)) {
            throw CreateError(400, 'Invalid Input Parameters')
        }

        let { userId, walletId } = req.body

        if (!isValid(userId)) {
            throw CreateError(400, `userId is required`)
        }

        if (!isValid(walletId)) {
            throw CreateError(400, `wallet id is required`)
        }

        let min = 1
        let max = walletModel.find().count()

        if (walletId < min || walletId > max) {
            throw CreateError(400, 'Invalid Wallet Selection')
        }

        let walletById = await walletModel.findOne({ walletId: walletId }).select({ nameOfWallet: 1, walletId: 1, _id: 0 }).lean()

        let userWallet = {

            ...walletById,
            credit: 0,
            debit: 0,
            balance: 0,
            isActive: true

        }

        let updatedData = await userModel.findOneAndUpdate({ userId: userId }, { $addToSet: { wallets: userWallet } }, { new: true })

        return res.status(201).send({
            status: 201,
            message: 'Wallet added successfully',
            data: updatedData
        })


    } catch (error) {
        next(error)
    }

}



const getUser = async (req, res, next) => {

    try {

        let allusers = await userModel.find()
        res.send(allusers)

    } catch (error) {
        next(error)
    }

}

const getUserByID = async (req, res, next) => {
    try {

        if (!isValidRequestBody(req.body)) {
            throw CreateError(400, `invalid request parameteres`)
        }

        let { userId } = req.params

        if (!isValid(userId)) {
            throw CreateError(400, `please enter a valid user id`)
        }

        let userById = await userModel.findOne(userId)

        if (!userById) {
            throw CreateError(400, 'user Not Found')
        }

        res.status(200)
        res.json({
            message: 'success',
            User: userById
        })


    } catch (error) {
        next(error)
    }
}


module.exports = {

    register,
    addWallet,
    getUser,
    Login,
    getUserByID

}