const userModel = require('../Models/userModel')
const walletModel = require('../Models/walletModel')
let { random } = require('../utils/helper')
let { sign } = require('jsonwebtoken')
let { isValidRequestBody, isValid } = require('../utils/validator')
const CreateError = require('http-errors')
const otpModel = require('../Models/otpModel')
const nodemailer = require("nodemailer")
require("dotenv").config()




const register = async (req, res, next) => {

    try {

        if (!isValidRequestBody(req.body)) {
            throw CreateError(400, 'invalid request Parameters')
        }

        let _id;

        let { email, password, name, lastname } = req.body

        // if (!pubAddress || pubAddress.length < 42) {
        //     throw CreateError(400, 'Please Provide a valid public address')
        // }

        let pubAddress;

        if (!email) {
            throw CreateError(400, `Email is required`)
        }

        if (!password) {
            throw CreateError(400, `password is required`)
        }

        let allUsers = await userModel.find()
        let userByPubId = allUsers.find(e => e.pubAddress == pubAddress || e.email == email)

        if (userByPubId) {
            return res.status(409)
                .send({
                    message: `User Is Already Registered`
                })
        }


        let userId = Number(random(4, ["0", "9"]))

        allUsers.forEach(e => {
            if (e.userId == userId) {
                userId = Number(random(4, ["0", "9"]))
            }
        })

        _id = allUsers.length + 1

        pubAddress = "gakjdfkuagkfgajgfjgajkghjkg"

        let newUser = {
            _id,
            userId,
            name,
            lastname,
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
        }).lean()

        if (!isUserExist) {
            throw CreateError(404, `user not found please cheack credintials`)
        }

        console.log(isUserExist)

        let token = sign({ ...isUserExist._doc }, "secretKey", { expiresIn: '1h' })

        return res.status(200).send({
            status: 200,
            message: 'login successFul',
            user: {
                userId: isUserExist._id,
                token: token
            }
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

        const num = 0;
        let decimalPoint = function insertDecimal(num) {
            return (num / 100).toFixed(8);
        }
        console.log(decimalma)
        let userWallet = {

            ...walletById,
            credit: decimalPoint,
            debit: decimalPoint,
            balance: decimalPoint,
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

        let userId = req.params.id

        // if (!isValid(userId)) {
        //     throw CreateError(400, `please enter a valid user id`)
        // }

        let userById = await userModel.findById(userId)

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

const emailSend = async (req, res, next) => {



        let data = await userModel.findOne({ email: req.body.email })
        //  console.log(data)
        // const response = {}
        let otpCode;

        if (data) {

            otpCode = Number(random(4, ["0", "9"]))
        } else {
            return res.status(404).send({
                message: "email is not present in Database"
            })
        }

        // nodemailer boilerplate code 

        

        let otpData = {

            email: req.body.email,
            code: otpCode,
            expireIn: new Date().getTime() + 300 * 1000

        }

        let resp = await otpModel.create(otpData)
        console.log(resp)
        // console.log(resp)
        var transport = nodemailer.createTransport({
            host: "relay.mailbaby.net",
            port: 587,
            auth: {
              user: "mb20059", //example of generated by Mailtrap
              pass: "sKDua7fCmK54we5d3kFK" //example of generated by Mailtrap
            }
          });
          var mailOptions = {
            from: 'suraj@siamaq.live',
            to: 'rahulkumarkiit94@gmail.com',
            subject:"otp code",
            html: `otp code : ${resp.code}`
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Email sent: ' + info.response);
          });

         
        respData = resp.toObject();
        delete respData.createdAt
        delete respData.updatedAt
        delete respData.__v

        return res.status(201).send({
            message: "email succesfully created",
            data: respData,

        })
        
    
}

const changePassword = async (req, res, next) => {

    try {
        let {email , code} = req.body
        let data = await otpModel.findOne({ email, code })
        // const response = {}
        // console.log(data)
        if (data) {
            let currentTime = new Date().getTime()
            let diff = data.expireIn - currentTime

            if (diff < 0) {
                return res.status(400).send({ message: "otp is expired" })
            } else {
                let user = await userModel.find({ email: req.body.email })
                user.password = req.body.password
                let resp = await userModel.updateOne({_id:user._id,},{$set:{password:user.password}},{new:true})
                
                return res.status(200).send({
                    message: "password change successfully",
                    data: resp
                })

            }
        }

        
    } catch (error) {
        next(error)
    }
}


  
module.exports = {

    register,
    addWallet,
    getUser,
    Login,
    getUserByID,
    emailSend,
    changePassword,
    

}