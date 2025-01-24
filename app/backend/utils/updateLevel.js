const UserModel = require('../models/userModel');

const levelsData = [
    { id: 1, name: 'Adventurous', rangeFrom: 0, rangeTo: 5000, reward: 5000, tonPrice: 50 },
    { id: 2, name: 'Energetic', rangeFrom: 5000, rangeTo: 50000, reward: 10000, tonPrice: 100 },
    { id: 3, name: 'Rockstar', rangeFrom: 50000, rangeTo: 250000, reward: 20000, tonPrice: 200 },
    { id: 4, name: 'Astronaut', rangeFrom: 250000, rangeTo: 500000, reward: 40000, tonPrice: 400 },
    { id: 5, name: 'Super Hero', rangeFrom: 500000, rangeTo: 1000000, reward: 80000, tonPrice: 800 },
    { id: 6, name: 'Detective', rangeFrom: 1000000, rangeTo: 2500000, reward: 160000, tonPrice: 1600 },
    { id: 7, name: 'Ninja', rangeFrom: 2500000, rangeTo: 5000000, reward: 320000, tonPrice: 3200 },
    { id: 8, name: 'Pirate', rangeFrom: 5000000, rangeTo: 20000000, reward: 640000, tonPrice: 6400 },
    { id: 9, name: 'Samurai Panda', rangeFrom: 20000000, rangeTo: 50000000, reward: 1280000, tonPrice: 12800 },
    { id: 10, name: 'Tapster', rangeFrom: 50000000, rangeTo: 150000000, reward: 2560000, tonPrice: 25600 },
    { id: 11, name: 'Tech Genius', rangeFrom: 150000000, rangeTo: 500000000, reward: 5120000, tonPrice: 51200 },
    { id: 12, name: 'Cyber Warrior', rangeFrom: 500000000, rangeTo: 1000000000, reward: 10240000, tonPrice: 102400 },
    { id: 13, name: 'Flare', rangeFrom: 1000000000, rangeTo: 3000000000, reward: 20480000, tonPrice: 204800 },
    { id: 14, name: 'The Crypto', rangeFrom: 3000000000, rangeTo: 'max', reward: 40960000, tonPrice: 409600 },
];

const usersLimit = 100;

exports.checkLevelUpgrade = async (userBalance, currentLevel) => {
    try {
        if (userBalance == null || currentLevel == null) {
            return { success: false, mess: 'Missing required fields!' };
        }

        if (currentLevel < 0 || currentLevel >= levelsData.length) {
            return { success: false, mess: 'Invalid current level!' };
        }

        const currentLevelData = levelsData[currentLevel];
        if (!currentLevelData) {
            return { success: false, mess: 'Current level not found!' };
        }

        if (currentLevelData.rangeTo === 'max' && userBalance >= currentLevelData.rangeFrom) {
            return {
                success: false,
                mess: 'You are already at the highest level.',
                data: { currentLevel, levelName: currentLevelData.name }
            };
        }

        if (userBalance >= currentLevelData.rangeFrom && userBalance < currentLevelData.rangeTo) {
            return {
                success: false,
                mess: 'No upgrade needed. You are within the current level.',
                data: { currentLevel, levelName: currentLevelData.name }
            };
        }

        const newLevelData = levelsData.find(level =>
            userBalance >= level.rangeFrom && (level.rangeTo === 'max' || userBalance < level.rangeTo)
        );

        if (!newLevelData) {
            return {
                success: false,
                mess: 'Balance exceeds the maximum threshold. No upgrade possible.',
                data: { currentLevel }
            };
        }

        if (newLevelData.id <= currentLevel + 1) {
            return {
                success: true,
                mess: 'Level upgraded successfully!',
                data: {
                    currentLevel: currentLevel,
                    levelName: levelsData[currentLevel].name
                }
            };
        } else {
            return {
                success: true,
                mess: 'Level upgraded successfully!',
                data: {
                    currentLevel: newLevelData.id - 1,
                    levelName: newLevelData.name
                }
            };
        }
    } catch (error) {
        console.error('Error checking & upgrading level!', error);
        return { success: false, mess: 'Internal Server Error!' };
    }
};

exports.BuyAndUpgradeLevel = async (req, res) => {
    try {
        const { userId, levelRequested } = req.body;

        // Deduct Ton Balance here .... in furture 


        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (levelRequested >= 0 && levelRequested <= 13) {
            if (levelRequested > user.level) {
                user.balance += levelsData[levelRequested].rangeFrom;
                user.allTimeBalance += levelsData[levelRequested].rangeFrom;
                user.level = levelRequested;
                await user.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'Level Upgraded Succesfully!',
                    newLevel: user.level,
                    newBalance: user.balance,
                    newAllTimeBalance: user.allTimeBalance,
                    newLevelName: levelsData[user.level].name
                })
            } else {
                if (user.level === levelRequested) {
                    return res.status(200).json({
                        status: 'failed',
                        message: 'Already have the requested level!'
                    })
                } else {
                    return res.status(200).json({
                        status: 'failed',
                        message: 'You cannot downgrade to down level!'
                    })
                }
            }
        } else {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid Level Upgrade Request!'
            })
        }

    } catch (error) {
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchTopUsersForAllLevels = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'failed',
                message: 'UserId is required'
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const allLevelTopUsers = {};

        for (const { id, name, rangeFrom, rangeTo } of levelsData) {

            /*
            const topUsers = await UserModel.aggregate([
                { $match: { allTimeBalance: { $gte: rangeFrom, $lt: rangeTo === 'max' ? Number.MAX_SAFE_INTEGER : rangeTo } } },
                { $sort: { allTimeBalance: -1 } },
                { $limit: usersLimit - 1 },
            ]);
            */

            const topUsers = await UserModel.aggregate([
                {
                    $match: {
                        allTimeBalance: {
                            $gte: rangeFrom,
                            $lt: rangeTo === 'max' ? Number.MAX_SAFE_INTEGER : rangeTo
                        }
                    }
                },
                {
                    $sort: { allTimeBalance: -1 }
                },
                {
                    $limit: usersLimit - 1
                },
                {
                    $project: {
                        allTimeBalance: 1,
                        firstName: 1,
                        profilePic: 1,
                        _id: 1
                    }
                }
            ]);

            const isUserInLevel = user.allTimeBalance >= rangeFrom && (rangeTo === 'max' || user.allTimeBalance < rangeTo);

            if (isUserInLevel) {
                const isUserInTop = topUsers.some(u => String(u._id) === String(user._id));

                if (!isUserInTop) {
                    topUsers.push(user);
                }

                topUsers.sort((a, b) => b.allTimeBalance - a.allTimeBalance);
            }

            allLevelTopUsers[id - 1] = topUsers.slice(0, usersLimit);
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
