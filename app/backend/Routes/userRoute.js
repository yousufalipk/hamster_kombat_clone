const express = require('express');

const {
    initializeUser,
    energyLevelUpgrade,
    multiTapLevelUpgrade,
    unlimitedTaps,
    refillEnergy,
    toggleUnlimitedTapsStatus,
    claimDailyRewards,
    checkPremium,
    fetchUserProjects,
    upgradeUserProjectLevel,
    fetchKols,
    fetchUserKols,
    upgradeUserKolLevel,
    fetchVcs,
    fetchUserVcs,
    upgradeUserVcLevel,
    fetchPatners,
    fetchUserPatners,
    upgradeUserPatnerLevel,
    storeErrorLog,
    test
} = require('../controllers/userController');

const {
    fetchTopUsersForAllLevels
} = require('../utils/updateLevel');

const router = express.Router();


router.route('/fetch-user').post(initializeUser);
router.route('/energy-level-upgrade').post(energyLevelUpgrade);
router.route('/multitap-level-upgrade').post(multiTapLevelUpgrade);
router.route('/claim-unlimited-taps').post(unlimitedTaps);
router.route('/toggle-unlimited-taps-status').post(toggleUnlimitedTapsStatus);
router.route('/refill-energy').post(refillEnergy);
router.route('/claim-daily-reward').post(claimDailyRewards);
router.route('/check-premium').post(checkPremium);
router.route('/fetch-leaderboard').post(fetchTopUsersForAllLevels);
router.route('/fetch-user-projects').post(fetchUserProjects);
router.route('/upgrade-project-level').post(upgradeUserProjectLevel);
router.route('/fetch-kols').get(fetchKols);
router.route('/fetch-user-kols').post(fetchUserKols);
router.route('/upgrade-kol-level').post(upgradeUserKolLevel);
router.route('/fetch-vcs').get(fetchVcs);
router.route('/fetch-user-vcs').post(fetchUserVcs);
router.route('/upgrade-vc-level').post(upgradeUserVcLevel);
router.route('/fetch-patners').get(fetchPatners);
router.route('/fetch-user-patners').get(fetchUserPatners);
router.route('/upgrade-patner-level').get(upgradeUserPatnerLevel);

// Test
router.route('/test').post(test);
router.route('/store-error-log').post(storeErrorLog);


module.exports = router;