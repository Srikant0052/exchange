
const router = require('express').Router()
const { register, addWallet, getUser, Login } = require('../Controller/userController')


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/register', register)
router.post('/addwallet', addWallet)
router.get('/getUser', getUser)
    .post('/login', Login)

module.exports = router