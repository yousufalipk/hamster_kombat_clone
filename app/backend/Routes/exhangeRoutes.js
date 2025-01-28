const express = require('express');
const router = express.Router();

const {
    /*
    connectWallet,
    disconnectWallet,
    */
    updateWalletAddress,
    initiateTransaction,
    updateTransactionStatus
} = require('../controllers/exchangeController');


/*
router.route('/connect').post(connectWallet);

router.route('/disconnect').post(disconnectWallet);
*/

router.route('/initiate-transaction').post(initiateTransaction);

router.route('/update-transaction').post(updateTransactionStatus);

router.route('/update-wallet-address').post(updateWalletAddress);


module.exports = router;