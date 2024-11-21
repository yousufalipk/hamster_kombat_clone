const UserModel = require('../models/userModel');
const { TELEGRAM_BOT_TOKEN } = require('../config/env');
const { Telegraf } = require("telegraf");
const { getIo, userSocketMap } = require('../utils/socketHelper');

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const {
    check2min,
    check1day,
    check2days,
} = require('../utils/index');
const {
    resetBoosters,
    resetDailyRewards
} = require('../utils/reset');
const {
    getCoinsPerMinute
} = require('../utils/coinsPerMinute');
const {
    getProfilePhoto
} = require('../utils/user');

const energyUpgradeCost = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
const energyLimits = [1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000];

const multitapUpgradeCost = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
const multitapValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const day = [0, 1, 2, 3, 4, 5, 6];
const reward = [500, 1000, 1500, 2000, 2500, 3000, 3500];


/* Notes ---------
    Saving current date ===   const currentDate = new Date();
    date format === const date = '2024-10-26T06:16:10.638Z';
*/

// Initialize User
exports.initializeUser = async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username, referrerId, isPremium } = req.body;

        let isUser = await UserModel.findOne({ telegramId });

        const currentDate = new Date();

        let balance = 0;

        if (!isUser) {
            if (referrerId) {
                if (isPremium) {
                    balance = 25000;
                } else {
                    balance = 10000;
                }
            } else {
                balance = 0;
            }
            // update refferals array
            const refRes = await UserModel.findOne({ telegramId: referrerId });
            if (!refRes) {
                console.log("Reffer not found!");
            } else {
                const data = {
                    telegramId: telegramId,
                    firstName: firstName,
                    lastName: lastName,
                    reward: balance
                }
                refRes.referrals.push(data);
                refRes.balance += balance;

                // Emiting balance update to reffere user
                const socketId = userSocketMap.get(refRes.telegramId);
                if (socketId) {
                    console.log("Socket id backend", socketId);
                    const io = getIo();
                    console.log("IO", io);
                    io.to(socketId).emit('refresh', refRes);
                }
                await refRes.save();
            }
        }

        if (!isUser) {
            let profilePhoto = 'not set';
            const res = await getProfilePhoto(telegramId);
            if (res.success) {
                profilePhoto = res.photo;
            }

            isUser = new UserModel({
                telegramId,
                firstName,
                lastName,
                username,
                pic: null,
                level: 'silver',
                currentRank: 0,
                balance: balance,
                energy: {
                    level: 0,
                    limit: 1500
                },
                multitaps: {
                    level: 0,
                    value: 1
                },
                unlimitedTaps: {
                    status: false,
                    avaliable: 5,
                },
                energyRefill: {
                    avaliable: 3,
                },
                dailyReward: {
                    claimed: [],
                    day: 0,
                    reward: 500
                },
                coinsPerMinute: {
                    value: 0,
                    lastClaimed: currentDate
                },
                referrals: [],
                profilePic: profilePhoto
            });
            isUser = await isUser.save();
        } else {
            let res1, res2, res3;
            res1 = resetBoosters(isUser); // If 1 day passed (only for ex-users)
            res2 = resetDailyRewards(res1);

            if (isUser.coinsPerMinute.value !== 0) {
                res3 = await getCoinsPerMinute(res2);
                await res3.save();
                isUser = res3;
            } else {
                await res2.save();
                isUser = res2;
            }

            if (isUser.unlimitedTaps.status === true) {
                const lastClaimed = isUser.unlimitedTaps.lastClaimed;
                const is2mins = check2min(lastClaimed);

                if (!is2mins) {
                    isUser.unlimitedTaps.status = false;
                    await isUser.save();
                }
            }
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
        user.unlimitedTaps.status = true;
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

exports.toggleUnlimitedTapsStatus = async (req, res) => {
    try {
        const { userId } = req.body;

        const isUser = await UserModel.findById(userId);

        if (!isUser) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (isUser.unlimitedTaps.status = true) {
            isUser.unlimitedTaps.status = false;
            await isUser.save();
        }

        return res.status(200).json({
            status: 'success',
            message: 'Status Updated succesfuly!',
        })

    } catch (error) {
        console.log("Error Toggeling Status!");
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.claimDailyRewards = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        const claimed = user.dailyReward.claimed;

        if (claimed.length <= 0) {
            const toClaimReward = user.dailyReward.reward;
            const currentDate = new Date();

            user.dailyReward.claimed.push(0);
            user.dailyReward.date = currentDate;
            user.dailyReward.day++;
            user.dailyReward.reward = reward[user.dailyReward.day];
            user.balance += toClaimReward;
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Daily Reward Claimed Succesfuly!',
                claimed: claimed,
                user: user
            });
        } else {
            const lastDateClaimed = user.dailyReward.date;
            const lastDayClaimed = claimed[claimed.length - 1];
            if (lastDayClaimed === 6) {
                const lastDateClaimed = user.dailyReward.date;
                const is1day = check1day(lastDateClaimed);
                if (!is1day) {
                    user.dailyReward.claimed = [];
                    user.dailyReward.date = null;
                    user.dailyReward.day = 0;
                    user.dailyReward.reward = 500;
                    await user.save();
                    return res.status(200).json({
                        status: 'failed',
                        message: '1 Week Passed, Resetting data, try again!'
                    })
                } else {
                    return res.status(200).json({
                        stauts: 'failed',
                        message: 'You have already claimed todays reward!'
                    })
                }
            }
            // check 24 hours if the day is continuing
            const is24hrs = check1day(lastDateClaimed);
            if (is24hrs) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'You have already claimed todays reward'
                })
            } else {
                const is48hrs = check2days(lastDateClaimed);
                console.log(is48hrs);
                if (!is48hrs) {
                    user.dailyReward.claimed = [];
                    user.dailyReward.date = null;
                    user.dailyReward.day = 0;
                    user.dailyReward.reward = 500;
                    await user.save();
                    return res.status(200).json({
                        status: 'failed',
                        message: 'Daily Streak Break resetting data, Try again!',
                        user: user
                    })
                } else {
                    const toClaimReward = user.dailyReward.reward;
                    const currentDate = new Date();

                    user.dailyReward.claimed.push(user.dailyReward.day);
                    user.dailyReward.date = currentDate;
                    user.dailyReward.day++;
                    user.dailyReward.reward = reward[user.dailyReward.day];
                    user.balance += toClaimReward;
                    await user.save();
                    return res.status(200).json({
                        status: 'success',
                        message: 'Daily Reward Claimed Succesfuly!',
                        claimed: claimed,
                        user: user
                    });
                }
            }
        }
    } catch (error) {
        console.log("Error claiming daily reward");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.storeErrorLog = async (req, res) => {
    try {
        const { error } = req.body;

        console.log("Error", error);

        /*
        const newlog = new ErrorModel({
            error: error
        });

        await newlog.save();

        */
        return res.status(200).json({
            status: 'success',
            message: 'Error log saved succesfuly!'
        })
    } catch (error) {
        console.log("Error Storing log!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.checkPremium = async (req, res) => {
    try {
        const { telegramId } = req.body;

        const chatMember = await bot.telegram.getChatMember(telegramId, telegramId);

        const isPremium = chatMember.user?.is_premium || false;

        return res.status(200).json({
            status: 'success',
            telegramId,
            isPremium
        });
    } catch (error) {
        console.error("Error checking premium!", error);
        return res.status(500).json({
            status: 'failed',  // Fixed typo here
            message: 'Internal Server Error'
        });
    }
};

exports.test = async (req, res) => {
    try {
        const { error } = req.body;

        console.log("Test Api Error", error);

        return res.status(200).json({
            status: 'success',
            message: 'Testing Success!'
        })
    } catch (error) {
        console.log("Error testing: ", error);
    }
}