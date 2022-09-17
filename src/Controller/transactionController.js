const transactionModel = require('../Models/transactionModel');
const userModel = require('../Models/userModel');
const { random } = require('../utils/helper');
const CreateError = require('http-errors');
const { isValid, isValidRequestBody } = require('../utils/validator');



const deposit = async (req, res, next) => {

    try {

        let requestBody = JSON.parse(JSON.stringify(req.body))
        let userId = req.params.userId;

        console.log(req.body)

        if (!isValidRequestBody(requestBody)) {
            throw CreateError(400, "Field can't be empty!");
        }

        let { publicAddress, credit, description, walletId, transactionHash } = requestBody;

        credit = Number(credit)
        walletId = Number(walletId)

        console.log(credit, walletId)

        if (!isValid(credit)) {
            throw CreateError(400, "Please Enter Amount!");
        }

        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        let transactionId = Number(random(4, ["0", "9"]));
        let transactionNumber = Number(random(8, ["0", "9"]));


        let transactionData = {
            userId, publicAddress, credit, description, transactionId, transactionNumber, transactionHash
        }

        let findUser = await userModel.findById({ _id: userId })

        if (!findUser) {
            throw CreateError(404, "User Not Found")
        }

        const addTransaction = await transactionModel.create(transactionData)

        let updateInUserWallet = await userModel.findOneAndUpdate({ _id: userId, "wallets.walletId": walletId },
            {
                $inc: {
                    "wallets.$.credit": + credit,
                    "wallets.$.balance": + credit
                }
            },
            { new: true })

        if (!updateInUserWallet) {
            return res.status(500).send({ message: 'ransaction Not Added' })
        }

        return res.status(201).send({

            status: true,
            message: "Success",
            data: { addTransaction, updateInUserWallet }

        });

    } catch (error) {
        console.log(error)
        next(error)
    }

}

const withdraw = async (req, res) => {
    try {
        const requestBody = req.body;
        const userId = req.params.userId;
        let flag = false;

        if (!isValidRequestBody(requestBody)) {
            throw CreateError(400, "Field can't be empty!");
        }

        const { publicAddress, debit, description, walletId } = requestBody;

        if (!isValid(debit)) {
            throw CreateError(400, "Please Enter Amount!");
        }
        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        const user = await userModel.findOne({ userId });

        if (!user) {
            throw CreateError(404, 'User Not Found');
        }

        user["wallets"].forEach(element => {
            if (element.balance >= debit && element.walletId === walletId) {
                flag = true;
            }
        });

        if (!flag) {
            throw CreateError(400, 'Insufficient Balance');
        }

        const transactionId = Number(random(4, ["0", "9"]));
        const transactionNumber = Number(random(8, ["0", "9"]));

        const transactionData = {
            userId, publicAddress, debit, description, transactionId: transactionId, transactionNumber: transactionNumber, walletId: walletId
        }

        const addTransaction = await transactionModel.create(transactionData);
        let updateInUserWallet = await userModel.findOneAndUpdate({ userId: userId, "wallets.walletId": walletId },
            {
                $inc: {
                    "wallets.$.debit": + debit,
                    "wallets.$.balance": - debit
                }
            },
            { new: true })


        return res.status(201).send({ status: true, message: "Success", data: { addTransaction, updateInUserWallet } });


    } catch (error) {
        next(error)
    }
}

const updateTr = async (req, res, next) => {

    try {

        let userId = req.params.userId
        let { status } = req.body

        let updateQuery = {
            status
        }

        const updatedTr = await transactionModel.findOneAndUpdate({ userId }, updateQuery, { new: true })
        console.log(updatedTr)


    } catch (error) {
        next(error)
    }

}

module.exports = { deposit, withdraw, updateTr };