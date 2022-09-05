
const router = require('express').Router()
const { register } = require('../Controller/userController')


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/login', register)


module.exports = router