const express = require('express');

const {
    fetchUser,
    updateBalance
} = require('../controller/userController');

const router = express.Router();


router.route('/fetch-user').post(fetchUser);
router.route('/update-balance').post(updateBalance);


module.exports = router;