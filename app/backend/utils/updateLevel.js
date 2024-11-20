const UserModel = require('../models/userModel');

const levelsRanks = [
    { level: 'silver', thresholds: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000] },
    { level: 'gold', thresholds: [1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000] },
    { level: 'diamond', thresholds: [2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000, 2900000] },
    { level: 'platinum', thresholds: [3000000, 3100000, 3200000, 3300000, 3400000, 3500000, 3600000, 3700000, 3800000, 3900000] },
    { level: 'legendary', thresholds: [4000000, 4100000, 4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000, 4900000] },
    { level: 'master', thresholds: [5000000, 5100000, 5200000, 5300000, 5400000, 5500000, 5600000, 5700000, 5800000, 5900000] },
    { level: 'grandMaster', thresholds: [6000000, 6100000, 6200000, 6300000, 6400000, 6500000, 6600000, 6700000, 6800000, 6900000] },
    { level: 'epic', thresholds: [7000000, 7100000, 7200000, 7300000, 7400000, 7500000, 7600000, 7700000, 7800000, 7900000] }
];

exports.checkLevelUpgrade = async (userBalance, currentLevel, currentRank) => {
    try {

        if (userBalance == null || !currentLevel || currentRank == null) {
            return ({ success: false, mess: 'Missing required feilds!' });
        }

        const currentLevelData = levelsRanks.find(level => level.level === currentLevel);
        if (!currentLevelData) {
            return ({ success: false, mess: 'Invalid Current Level!' });
        }

        // Check if balance exceeds the maximum threshold
        const lastLevel = levelsRanks[levelsRanks.length - 1];
        const maxThreshold = lastLevel.thresholds[lastLevel.thresholds.length - 1];
        if (userBalance > maxThreshold) {
            return ({
                success: false,
                mess: 'Balance exceeds the maximum threshold. No upgrade needed.',
                data: {
                    currentLevel,
                    currentRank
                }
            });
        }

        let levelUpgraded = false;
        let rankUpgraded = false;

        let newLevel = currentLevel;
        for (let i = 0; i < levelsRanks.length; i++) {
            if (userBalance >= levelsRanks[i].thresholds[0]) {
                newLevel = levelsRanks[i].level;
            }
        }

        if (newLevel !== currentLevel) {
            levelUpgraded = true;
        }

        const currentThresholds = levelsRanks.find(level => level.level === newLevel).thresholds;
        let newRank = currentRank;
        for (let i = 0; i < currentThresholds.length; i++) {
            if (userBalance >= currentThresholds[i]) {
                newRank = i;
            }
        }

        if (newRank !== currentRank) {
            rankUpgraded = true;
        }

        if (levelUpgraded || rankUpgraded) {
            return ({
                success: true,
                mess: 'Level or rank upgraded!',
                data: {
                    newLevel,
                    newRank
                }
            });
        } else {
            return ({
                success: false,
                mess: 'No upgrade needed.',
                data: {
                    currentLevel,
                    currentRank
                }
            });
        }
    } catch (error) {
        console.error("Error checking & upgrading level!", error);
        return ({
            success: false,
            mess: 'Internal Server Error!'
        });
    }
};
const usersLimit = 10;

exports.fetchTopUsersForAllLevels = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(200).json({
                status: 'failed',
                message: 'UserId is required'
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const allLevelTopUsers = {};
        for (const { level } of levelsRanks) {
            const topUsers = await UserModel.aggregate([
                { $match: { level } },
                { $sort: { balance: -1 } },
                { $limit: usersLimit - 1 },
            ]);

            if (user.level === level) {
                const isUserInTop = topUsers.some(u => String(u._id) === String(user._id));

                if (!isUserInTop) {
                    topUsers.push(user);
                }

                topUsers.sort((a, b) => b.balance - a.balance);
            }

            allLevelTopUsers[level] = topUsers.slice(0, usersLimit);
        }

        res.status(200).json({
            status: 'success',
            leaderboard: allLevelTopUsers
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!"
        });
    }
};