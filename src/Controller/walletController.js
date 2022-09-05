const walletModel = require("../Models/walletModel");
const { random } = require("../utils/helper");



const createWallet = async (req, res) => {

    try {

<<<<<<< HEAD
        if (Object.keys(req.body).length <= 0) {

            return res.status(400).send({
                status: 400,
                message: "please provide valid wallet ttype"
            })

=======
        if (Object.keys(req.body).length < 0) {

            return res.status(400).send({ stattus: false, mas: "please provide valid wallet ttype" })
>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
        }

        let { nameOfWallet } = req.body;

        let isnameOfWallet = await walletModel.findOne({ nameOfWallet })

        if (isnameOfWallet) {
<<<<<<< HEAD
=======

>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
            return res.status(200).send("wallet created")
        }

        let newWallet = {
<<<<<<< HEAD
            nameOfWallet: nameOfWallet,
            walletId: Number(random(4, ["0", "9"])),
=======

            nameOfWallet: nameOfWallet,
            walletId: random(),
>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
            status: true,
        }

        let wallet = await walletModel.create(newWallet)

<<<<<<< HEAD
        return res.status(201).send({
            status: true,
            data: wallet
        })


    } catch (error) {
        return res.status(500).send({
            status : 500,
            message : "Internal Server Error"
        })
=======
        return res.status(201).send({ status: true, data: wallet })










    } catch (error) {

        return res.status(500).send("internal server error")
>>>>>>> 82181e37ac564a490a58957160440a7cd40cda3d
    }

}


module.exports = {
    createWallet
}


