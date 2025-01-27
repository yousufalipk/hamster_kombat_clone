const express = require('express');
const router = express.Router();

const {
    connectWallet,
    disconnectWallet,
    checkTonTransaction
} = require('../controllers/exchangeController');


router.route('/connect').post(connectWallet);

router.route('/disconnect').post(disconnectWallet);

router.route('/check-ton-transaction').post(checkTonTransaction);

module.exports = router;