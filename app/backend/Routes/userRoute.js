const express = require('express');
const router = express.Router();

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
    userOneProjectDetails,
    claimProjectTask,
    fetchUserKols,
    upgradeUserKolLevel,
    fetchVcs,
    fetchUserVcs,
    upgradeUserVcLevel,
    fetchPatners,
    fetchUserPatners,
    upgradeUserPatnerLevel,
    claimUserTask,
    fetchUserTasks,
    claimInviteFriendsReward,
    fetchUserInviteFriends,
    claimCPM,
    updateWalletAddress,
    getServerTimeStamp,
    updateAllTimeBalance,
    fetchOneKolDetails,
    getRefferals,
    addContent,
    MigrateImagesWithTelegramId,
    UpdateReferralsProfilePic,
    dailyComboReset,
    watchAdsReward,
    getWalletBalance
} = require('../controllers/userController');

const {
    fetchTopUsersForAllLevels,
    BuyAndUpgradeLevel
} = require('../utils/updateLevel');


router.route('/fetch-user').post(initializeUser);
router.route('/get-refferals').post(getRefferals);
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
router.route('/fetch-projects-details').post(userOneProjectDetails);
router.route('/claim-project-task').post(claimProjectTask);
router.route('/fetch-user-kols').post(fetchUserKols);
router.route('/upgrade-kol-level').post(upgradeUserKolLevel);
router.route('/fetch-vcs').post(fetchVcs);
router.route('/fetch-user-vcs').post(fetchUserVcs);
router.route('/upgrade-vc-level').post(upgradeUserVcLevel);
router.route('/fetch-patners').post(fetchPatners);
router.route('/fetch-user-patners').post(fetchUserPatners);
router.route('/upgrade-patner-level').post(upgradeUserPatnerLevel);
router.route('/claim-user-task').post(claimUserTask);
router.route('/fetch-user-tasks').post(fetchUserTasks);
router.route('/fetch-invite-friends').post(fetchUserInviteFriends);
router.route('/claim-refferal-reward').post(claimInviteFriendsReward);
router.route('/claim-cpm').post(claimCPM);
router.route('/get-server-timestamp').get(getServerTimeStamp);
router.route('/update-all-time-balance').post(updateAllTimeBalance);
router.route('/fetch-one-kol-detail').post(fetchOneKolDetails);
router.route('/watch-ads-reward').get(watchAdsReward);
router.route('/get-wallet-balance').post(getWalletBalance);

/*
router.route('/update-wallet-address').post(updateWalletAddress);
*/


router.route('/add-content').post(addContent);
router.route('/reset-daily-combo').get(dailyComboReset);

router.route('/buy-level').post(BuyAndUpgradeLevel);

/*
router.route('/move-images').get(MigrateImagesWithTelegramId);
router.route('/update-refferals-pics').get(UpdateReferralsProfilePic);
*/

module.exports = router;