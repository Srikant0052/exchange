const router = require('express').Router();

const {userLogin} = require('../Controller/userLoginController');

app.post('/userlogin', userLogin)

module.exports = router;