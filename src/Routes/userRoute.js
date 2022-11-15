

const router = require('express').Router()

const {

    register,
    addWallet,
    getUser,
    Login,
    getUserByID,
    emailSend,
    changePassword,
    getBitsBalance,
    updateInBitsWallet

} = require('../Controller/userController')

router
    .post('/register', register)
    .post('/addwallet', addWallet)
    .get('/getUser', getUser)
    .get('/getuserbyid/:id', getUserByID)
    .post('/login', Login)
    .post("/email-send", emailSend)
    .post("/change-password", changePassword)
    .get('/getBits/:id', getBitsBalance)
    .put('/updateInBitsWallet/:id', updateInBitsWallet)


module.exports = router