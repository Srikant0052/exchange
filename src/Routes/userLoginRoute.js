const router = require('express').Router();

const {userlogin} = require('../Controller/userLoginController');

router.post('/userlogin', userlogin)

module.exports = router;