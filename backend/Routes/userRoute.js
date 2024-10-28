const express = require('express');

const {
    initializeUser,
    energyLevelUpgrade,
    multiTapLevelUpgrade,
    unlimitedTaps,
    refillEnergy,
    toggleUnlimitedTapsStatus,
    claimDailyRewards,

    test
} = require('../controllers/userController');

const router = express.Router();


router.route('/fetch-user').post(initializeUser);
router.route('/energy-level-upgrade').post(energyLevelUpgrade);
router.route('/multitap-level-upgrade').post(multiTapLevelUpgrade);
router.route('/claim-unlimited-taps').post(unlimitedTaps);
router.route('/toggle-unlimited-taps-status').post(toggleUnlimitedTapsStatus);
router.route('/refill-energy').post(refillEnergy);
router.route('/claim-daily-reward').post(claimDailyRewards);



// Test
router.route('/test').post(test);


module.exports = router;