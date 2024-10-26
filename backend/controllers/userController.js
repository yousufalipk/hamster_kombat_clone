const UserModel = require('../models/userModel');

const energyUpgradeCost = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
const energyLimits = [1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000];

const multitapUpgradeCost = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
const multitapValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Initialize User
exports.initializeUser = async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username } = req.body;

        let isUser = await UserModel.findOne({ telegramId });

        if (!isUser) {
            isUser = new UserModel({
                telegramId,
                firstName,
                lastName,
                username,
                pic: null,
                level: 'silver',
                currentRank: '0',
                balance: 0,
                energy: {
                    level: 0,
                    limit: 1500
                },
                multitaps: {
                    level: 0,
                    value: 1
                },
                unlimitedTaps: {
                    avaliable: 5,
                },
                energyRefill: {
                    avaliable: 3,
                }
            });
            isUser = await isUser.save();
        }

        return res.status(200).json({
            status: 'success',
            message: 'User initialized successfully!',
            user: isUser
        });

    } catch (error) {
        console.error("Error during user initialization:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
}


exports.energyLevelUpgrade = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (user.energy.level === 9) {
            return res.status(200).json({
                status: 'failed',
                message: 'Max level reached!'
            })
        }

        const cost = energyUpgradeCost[user.energy.level + 1];

        if (user.balance >= cost) {
            user.balance -= cost;
            user.energy.level += 1;
            user.energy.limit = energyLimits[user.energy.level];
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Energy Limit Upgraded successfuly!',
                user: user
            })
        } else {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient Balance!'
            })
        }
    } catch (error) {
        console.log("Error upgrading energy level!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.multiTapLevelUpgrade = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (user.multitaps.level === 9) {
            return res.status(200).json({
                status: 'failed',
                message: 'Max level reached!'
            })
        }

        const cost = multitapUpgradeCost[user.multitaps.level + 1];

        if (user.balance >= cost) {
            user.balance -= cost;
            user.multitaps.level += 1;
            user.multitaps.value = multitapValues[user.multitaps.level];
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Tap Value Upgraded successfuly!',
                user: user
            })
        } else {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient Balance!'
            })
        }
    } catch (error) {
        console.log("Error upgrading multitap level!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}
