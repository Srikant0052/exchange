const allTransactionModel = require('../Models/trModels/allTransactions');
const creditModel = require('../Models/trModels/creditTr');
const debitModel = require('../Models/trModels/debitTr');

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

        let { publicAddress, credit, description, walletId, transactionHash, txType, transactionId, getWay } = requestBody;

        credit = Number(credit)
        walletId = Number(walletId)

        console.log(credit, walletId)

        if (!isValid(credit)) {
            throw CreateError(400, "Please Enter Amount!");
        }

        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        let transactionData = {
            userId, publicAddress, credit, description, transactionId, transactionHash, txType, getWay
        }

        const addTransaction = await allTransactionModel.create(transactionData)

        return res.status(201).send({

            status: true,
            message: "Success",
            data: { addTransaction }

        });

    } catch (error) {
        console.log(error)
        next(error)
    }

}

const withdraw = async (req, res) => {
    try {
        const requestBody = JSON.parse(JSON.stringify(req.body))
        const userId = req.params.userId;
        // let flag = false;

        if (!isValidRequestBody(requestBody)) {
            throw CreateError(400, "Field can't be empty!");
        }

        const { publicAddress, debit, description, walletId, transactionHash } = requestBody;

        if (!isValid(debit)) {
            throw CreateError(400, "Please Enter Amount!");
        }
        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        const transactionId = Number(random(4, ["0", "9"]));

        const transactionData = {
            userId, publicAddress, debit, description, transactionId, walletId, transactionHash, txType
        }

        const addTransaction = await allTransactionModel.create(transactionData);
        return res.status(201).send({ status: true, message: "Success", data: { addTransaction } });


    } catch (error) {
        next(error)
    }
}

const addCreditTr = async (req, res, next) => {

    try {

        const requestBody = JSON.parse(JSON.stringify(req.body));
        const userId = req.params.userId;

        console.log(req.body)

        if (!isValidRequestBody(requestBody)) {
            throw CreateError(400, "Field can't be empty!");
        }
        let { publicAddress, credit, description, walletId, transactionHash, transactionId, txType, getWay } = requestBody;

        credit = Number(credit);
        walletId = Number(walletId);

        if (!isValid(credit)) {
            throw CreateError(400, "Please Enter Amount!");
        }

        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        let creditData = {
            userId, publicAddress, credit, description, transactionId, transactionHash, walletId, txType, getWay
        }

        let findUser = await userModel.findById({ _id: userId });

        if (!findUser) {
            throw CreateError(404, "User Not Found");
        }

        const updatedCredit = await creditModel.create(creditData);

        if (!updatedCredit) {
            return res.status(400).send({ message: 'Credit Not Added' });
        }

        let updateInUserWallet = await userModel.findOneAndUpdate({ _id: userId, "wallets.walletId": walletId },
            {
                $inc: {
                    "wallets.$.credit": + credit,
                    "wallets.$.balance": + credit
                }
            },
            { new: true });

        if (!updateInUserWallet) {
            return res.status(400).send({ message: 'transaction Not Added' })
        }

        return res.status(201).send({ status: true, message: "Success", data: { updatedCredit, updateInUserWallet } });

    } catch (error) {
        console.log(error)
    }
}

const debitUpdate = async (req, res, next) => {
    try {
        const requestBody = JSON.parse(JSON.stringify(req.body));
        const userId = req.params.userId;
        let flag = false;

        if (!isValidRequestBody(requestBody)) {
            throw CreateError(400, "Field can't be empty!");
        }
        let { publicAddress, debit, description, walletId, transactionHash, transactionId } = requestBody;

        debit = Number(debit);
        walletId = Number(walletId);
        if (!isValid(debit)) {
            throw CreateError(400, "Please Enter Amount!");
        }
        if (!isValid(description)) {
            throw CreateError(400, "Please Give Description!");
        }

        const user = await userModel.findById({ _id: userId });

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

        let debitData = {
            userId, publicAddress, debit, description, transactionId, transactionHash, walletId
        }

        const updatedDebit = await debitModel.create(debitData);

        if (!updatedDebit) {
            return res.status(400).send({ message: 'Debit Not Added' });
        }

        let updateInUserWallet = await userModel.findOneAndUpdate({ _id: userId, "wallets.walletId": walletId },
            {
                $inc: {
                    "wallets.$.debit": + debit,
                    "wallets.$.balance": - debit
                }
            },
            { new: true });

        if (!updateInUserWallet) {
            return res.status(400).send({ message: 'transaction Not Added' });
        }

        return res.status(201).send({ status: true, message: "Success", data: { updatedDebit, updateInUserWallet } });

    } catch (error) {
        next(error);
    }
}

const updateTr = async (req, res, next) => {

    try {

        let userId = req.params.userId;
        let { status } = req.body;

        let updateQuery = {
            status
        }

        const updatedTr = await allTransactionModel.findOneAndUpdate({ userId }, updateQuery, { new: true });
        console.log(updatedTr);


    } catch (error) {
        next(error)
    }

}

const getTrById = async (req, res, next) => {

    try {


        let userId = req.params.userId
        let userTrList = await allTransactionModel.find({ userId }).populate("userId", `wallets`)

        res.status(200).send({
            message: 'Success',
            data: userTrList
        })


    } catch (error) {
        next(error)
    }

}



module.exports = { deposit, withdraw, updateTr, getTrById, addCreditTr, debitUpdate };
