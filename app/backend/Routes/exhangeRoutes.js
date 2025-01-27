const express = require('express');
const router = express.Router();

const {
    connectWallet,
    disconnectWallet
} = require('../controllers/exchangeController');


router.route('/connect').post(connectWallet);

router.route('/disconnect').post(disconnectWallet);

module.exports = router;