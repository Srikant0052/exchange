const router = require('express').Router();
const { deposit, withdraw, updateTr, getTrById } = require('../Controller/transactionController');


router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);
router.put('/updatetr/:userId', updateTr)
router.get(`/gettrbyid/:userId`, getTrById)


module.exports = router;
