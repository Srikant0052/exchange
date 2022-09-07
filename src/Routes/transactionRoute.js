const router = require('express').Router();
const { deposit, withdraw } = require('../Controller/transactionController');


// router.get('/testing', (req, res) => {
//     res.send('hellow from server')
// })

router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);


module.exports = router;
