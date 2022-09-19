const router = require('express').Router();
<<<<<<< HEAD
const { deposit, withdraw, updateTr, getTrById } = require('../Controller/transactionController');
=======
const { deposit, withdraw, updateTr, creditUpdate, debitUpdate } = require('../Controller/transactionController');
>>>>>>> e63c5b2ec33f875052bb4761846a33d71cde8ecc


router.post('/:userId/addTransaction/deposit', deposit);
router.post('/:userId/addTransaction/withdraw', withdraw);
router.post('/:userId/credit', creditUpdate);
router.post('/:userId/debit', debitUpdate);
router.put('/updatetr/:userId', updateTr)
router.get(`/gettrbyid/:userId`, getTrById)


module.exports = router;
