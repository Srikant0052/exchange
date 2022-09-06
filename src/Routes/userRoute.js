
const router = require('express').Router()
const { register, addWallet, getUser } = require('../Controller/userController')


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/login', register)
router.post('/addwallet', addWallet)
router.get('/getUser', getUser)

module.exports = router