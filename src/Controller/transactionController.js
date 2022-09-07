const transactionModel = require('../Models/transactionModel');
const walletModel = require('../Models/walletModel');
const userModel = require('../Models/userModel');
const { random } = require('../utils/helper');


const deposit = async (req, res) => {
    try {
        const requestBody = req.body;
        const userId = req.params.userId;
        const { publicAddress, credit, description, walletId } = requestBody;


        const user = await userModel.findOne({ userId });

        if (!user) {
            return res.status(404).send({ status: false, message: "Data not found" });
        }

        const transactionId = Number(random(4, ["0", "9"]));
        const transactionNumber = Number(random(8, ["0", "9"]));

        const transactionData = {
            userId, publicAddress, credit, description, transactionId: transactionId, transactionNumber: transactionNumber
        }

        let findUser = await userModel.findOne({ userId: userId })
        if (!findUser) {
            return res.status(404).send({
                message: 'user not found'
            })

        }

        let updateInUserWallet = await userModel.findOneAndUpdate({ userId: userId, "wallets.walletId": walletId },
            {
                $inc: {
                    "wallets.$.credit": + credit,
                    "wallets.$.balance": + credit
                }
            },
            { new: true })

        const addTransaction = await transactionModel.create(transactionData);

        return res.status(201).send({ status: true, message: "Success", data: { addTransaction, updateInUserWallet } });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
    
}

const withdraw = async (req, res) => {
    try {
        const requestBody = req.body;
        const userId = req.params.userId;
        const { publicAddress, debit, description } = requestBody;

        const user = await userModel.findOne({ userId });

        if (!user) {
            return res.status(404).send({ status: false, message: "Data not found" });
        }

        const transactionId = Number(random(4, ["0", "9"]));
        const transactionNumber = Number(random(8, ["0", "9"]));

        const transactionData = {
            userId, publicAddress, debit, description, transactionId: transactionId, transactionNumber: transactionNumber
        }
        const addTransaction = await transactionModel.create(transactionData);

        return res.status(201).send({ status: true, message: "Success", data: addTransaction });


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { deposit, withdraw };