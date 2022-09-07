const router = require('express').Router();

const {userlogin} = require('../Controller/userLoginController');
const { createToken } = require('../Middleware/token');

router.post('/userlogin', userlogin)

router.post('/token', createToken)

module.exports = router;