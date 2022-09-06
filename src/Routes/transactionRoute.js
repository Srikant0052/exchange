const router = require('express').Router()
const { deposit } = require('../Controller/transactionController')


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/:userId/addTransaction', deposit)


module.exports = router