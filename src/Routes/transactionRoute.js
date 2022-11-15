const router = require('express').Router();
const { deposit, withdraw, updateTr, getTrById, addCreditTr, debitUpdate, getTrByCoinName } = require('../Controller/transactionController');

router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);
router.post('/credit/:userId', addCreditTr);
router.post('/:userId/debit', debitUpdate);
router.put('/updatetr/:userId/:transactionId', updateTr)
router.get(`/gettrbyid/:userId`, getTrById)
router.get(`/gettrbycoinandid/:coinName/:userId`, getTrByCoinName)

module.exports = router;
