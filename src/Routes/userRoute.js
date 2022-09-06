
const router = require('express').Router()
const { register, addWallet } = require('../Controller/userController')


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/login', register)
router.post('/addwallet', addWallet)

module.exports = router