const router = require('express').Router();

const {deposit, withdraw} = require('../Controller/transactionController');

router.post('/:userId/addTransaction', deposit);
router.post('/:userId/addTransaction', withdraw);

module.exports = router;