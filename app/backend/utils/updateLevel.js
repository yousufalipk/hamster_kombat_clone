const UserModel = require('../models/userModel');

const levelsData = [
    { id: 1, name: 'Adventurous', rangeFrom: 0, rangeTo: 50000 },
    { id: 2, name: 'Energetic', rangeFrom: 50000, rangeTo: 150000 },
    { id: 3, name: 'Rockstar', rangeFrom: 150000, rangeTo: 250000 },
    { id: 4, name: 'Astronaut', rangeFrom: 250000, rangeTo: 500000 },
    { id: 5, name: 'Super Hero', rangeFrom: 500000, rangeTo: 1000000 },
    { id: 6, name: 'Detective', rangeFrom: 1000000, rangeTo: 2500000 },
    { id: 7, name: 'Ninja', rangeFrom: 2500000, rangeTo: 5000000 },
    { id: 8, name: 'Pirate', rangeFrom: 5000000, rangeTo: 20000000 },
    { id: 9, name: 'Samurai Panda', rangeFrom: 20000000, rangeTo: 50000000 },
    { id: 10, name: 'Tapster', rangeFrom: 50000000, rangeTo: 150000000 },
    { id: 11, name: 'Tech Genius', rangeFrom: 150000000, rangeTo: 500000000 },
    { id: 12, name: 'Cyber Warrior', rangeFrom: 500000000, rangeTo: 1000000000 },
    { id: 13, name: 'Flare', rangeFrom: 1000000000, rangeTo: 3000000000 },
    { id: 14, name: 'The Crypto', rangeFrom: 3000000000, rangeTo: 'max' },
];

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

        if ((newLevelData.newLevelData.id - 1) <= currentLevel) {
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

const usersLimit = 100;

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
            const topUsers = await UserModel.aggregate([
                { $match: { balance: { $gte: rangeFrom, $lt: rangeTo === 'max' ? Number.MAX_SAFE_INTEGER : rangeTo } } },
                { $sort: { balance: -1 } },
                { $limit: usersLimit - 1 },
            ]);

            const isUserInLevel = user.balance >= rangeFrom && (rangeTo === 'max' || user.balance < rangeTo);

            if (isUserInLevel) {
                const isUserInTop = topUsers.some(u => String(u._id) === String(user._id));

                if (!isUserInTop) {
                    topUsers.push(user);
                }

                topUsers.sort((a, b) => b.balance - a.balance);
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
