const router = require('express').Router();
const { deposit, withdraw, updateTr, getTrById, creditUpdate, debitUpdate } = require('../Controller/transactionController');


router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);
router.post('/:userId/credit', creditUpdate);
router.post('/:userId/debit', debitUpdate);
router.put('/updatetr/:userId', updateTr)
router.get(`/gettrbyid/:userId`, getTrById)


module.exports = router;
