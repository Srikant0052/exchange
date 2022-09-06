const transactionModel = require('../Models/transactionModel');
const walletModel = require('../Models/walletModel');
const userModel = require('../Models/userModel');


const deposit = async (req, res) => {
    try {
        const requestBody = req.body;
        const userId = req.params.userId;
        const { publicAddress, credit, description } = requestBody;


        const addTransaction = await transactionModel.create()



        // depositData = {};
        // if ("credit" in requestBody) {

        // }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const withdraw = async (req, res) => {
    try {
        const requestBody = req.body;
        const userId = req.params.userId;
        const { publicAddress, debit, description } = requestBody;


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { deposit, withdraw };