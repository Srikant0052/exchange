
const router = require('express').Router()
const { register, addWallet, getUser, Login, getUserByID ,emailSend, changePassword} = require('../Controller/userController')

router.post('/register', register)
router.post('/addwallet', addWallet)
router.get('/getUser', getUser)
    .get('/getuserbyid/:id', getUserByID)
    .post('/login', Login)
    router.post("/email-send", emailSend)
    router.post("/change-password", changePassword)


module.exports = router