const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    logOutUser,
    refresh,
    fetchTwoTrueCards
} = require('../controller/userController');

// User routes

router.route('/register-user').post(createUser);

router.route('/login-user').post(loginUser);

router.route('/logout-user').post(logOutUser);

router.route('/refresh').post(refresh);

router.route('/fetch-dailyComboCard').get(fetchTwoTrueCards);

module.exports = router;