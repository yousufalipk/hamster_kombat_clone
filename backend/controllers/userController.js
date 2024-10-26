const UserModel = require('../models/userModel');
const {
    check1min,
    check2min,
    check1hour,
    check1day,
    check2days,
    check1week
} = require('../utils/index');
const {
    resetBoosters
} = require('../utils/reset');

const energyUpgradeCost = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
const energyLimits = [1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000];

const multitapUpgradeCost = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
const multitapValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


/* Notes ---------
    Saving current date ===   const currentDate = new Date();
    date format === const date = '2024-10-26T06:16:10.638Z';
*/

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
        } else {
            const res = resetBoosters(isUser); // If 1 day passed (only for ex-users)
            await res.save();
            isUser = res;
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

exports.unlimitedTaps = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (user.unlimitedTaps.available === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unlimited taps limit reached!'
            })
        }

        if (user.unlimitedTaps.lastClaimed !== null) {
            const lastClaimed = user.unlimitedTaps.lastClaimed;

            const alreadyBoosterEnabled = check2min(lastClaimed);

            if (alreadyBoosterEnabled) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Booster is already enabled!',
                    lastClaimed: user.unlimitedTaps.lastClaimed
                })
            }
        }

        const currentDate = new Date()

        user.unlimitedTaps.available -= 1;
        user.unlimitedTaps.lastClaimed = currentDate;
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Unlimited taps for 2 minutes!',
            remaining: user.unlimitedTaps.available
        })
    } catch (error) {
        console.log("Error upgrading unlimited taps!");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.refillEnergy = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (user.energyRefill.available === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Energy Refill limit reached!'
            })
        }

        if (user.energyRefill.lastClaimed !== null) {
            const lastClaimed = user.energyRefill.lastClaimed;

            const alreadyBoosterEnabled = check1hour(lastClaimed);

            if (alreadyBoosterEnabled) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Claim Refill after 1 hour!',
                    lastClaimed: user.energyRefill.lastClaimed
                })
            }
        }

        const currentDate = new Date()

        user.energyRefill.available -= 1;
        user.energyRefill.lastClaimed = currentDate;
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Energy Refilled Succesfully!',
            remaining: user.energyRefill.available
        })
    } catch (error) {
        console.log("Error refilling energy!");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.test = async (req, res) => {
    try {


        // Date format
        const date = '2024-10-26T06:16:10.638Z';
        check1min(date);


        //check2min();
        //check1day();
        //check2days();
        //check1week();

        return res.status(200).json({
            status: 'success',
            message: 'Testing Success!'
        })
    } catch (error) {
        console.log("Error testing: ", error);
    }
}
