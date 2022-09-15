
const router = require('express').Router()
const { register, addWallet, getUser, Login, getUserByID } = require('../Controller/userController')

router.post('/register', register)
router.post('/addwallet', addWallet)
router.get('/getUser', getUser)
    .get('/getuserbyid/:id', getUserByID)
    .post('/login', Login)

module.exports = router