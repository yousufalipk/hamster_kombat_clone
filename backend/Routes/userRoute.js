const express = require('express');

const {
    initializeUser,
    energyLevelUpgrade,
    multiTapLevelUpgrade
} = require('../controllers/userController');

const router = express.Router();


router.route('/fetch-user').post(initializeUser);
router.route('/energy-level-upgrade').post(energyLevelUpgrade);
router.route('/multitap-level-upgrade').post(multiTapLevelUpgrade);


module.exports = router;