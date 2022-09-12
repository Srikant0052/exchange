const router = require('express').Router();

const {userloginRecord} = require('../Controller/userLoginController');
// const { createToken } = require('../Middleware/token');

router.post('/userlog', userloginRecord)
module.exports = router;