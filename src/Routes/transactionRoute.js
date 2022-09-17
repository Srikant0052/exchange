const router = require('express').Router();
const { deposit, withdraw, updateTr } = require('../Controller/transactionController');


router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);
router.put('/updatetr/:userId', updateTr)


module.exports = router;
