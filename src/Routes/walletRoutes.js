
const router = require('express').Router()
const { createWallet, } = require('../Controller/walletController')


router.post('/createWallet', createWallet)

module.exports = router