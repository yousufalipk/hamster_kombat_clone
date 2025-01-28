const express = require('express');
const router = express.Router();

const {
    /*
    connectWallet,
    disconnectWallet,
    */
    updateWalletAddress,
    initiateTransaction,
    updateTransactionStatus,
    generateInvoiceLink,
    updateInvoiceStatus
} = require('../controllers/exchangeController');


/*
router.route('/connect').post(connectWallet);

router.route('/disconnect').post(disconnectWallet);
*/

router.route('/initiate-transaction').post(initiateTransaction);

router.route('/update-transaction').post(updateTransactionStatus);

router.route('/update-wallet-address').post(updateWalletAddress);

router.route('/generate-invoice-link').post(generateInvoiceLink);

router.route('/update-invoice').post(updateInvoiceStatus);


module.exports = router;