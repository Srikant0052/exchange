
const router = require('express').Router()
const { createWallet, getWallet } = require('../Controller/walletController')
const { protected } = require('../Middleware/token')


router.post('/createWallet', createWallet)
router.get('/getcoin', protected, getWallet)

module.exports = router