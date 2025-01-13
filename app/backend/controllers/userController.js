const UserModel = require('../models/userModel');
const ProjectModel = require('../models/projectSchema');
const KolModel = require('../models/kolsSchema');
const PatnerModel = require('../models/patnersSchema');
const VcModel = require('../models/vcSchema');
const TaskModel = require('../models/tasksSchema');
const SocialTaskModel = require('../models/socialTaskSchema');
const DailyTaskModel = require('../models/dailyTaskSchema');
const PartnerTaskModel = require('../models/patnerTaskSchema');
const { TELEGRAM_BOT_TOKEN } = require('../config/env');
const { Telegraf } = require("telegraf");
const { getIo, userSocketMap } = require('../utils/socketHelper');

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const {
    check30sec,
    check2min,
    check1day,
    check2days,
    check1week
} = require('../utils/index');
const {
    resetBoosters,
    resetDailyRewards,
    resetComboCards
} = require('../utils/reset');
const {
    getCoinsPerMinute
} = require('../utils/coinsPerMinute');
const {
    getProfilePhoto
} = require('../utils/user');

const energyUpgradeCost = [0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 2048000, 4096000, 8192000, 16384000, 32768000];
const energyLimits = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000];

const multitapUpgradeCost = [0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 2048000, 4096000, 8192000, 16384000, 32768000];
const multitapValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const day = [0, 1, 2, 3, 4, 5, 6];
const reward = [500, 1000, 1500, 2000, 2500, 3000, 3500];

const inviteTasks = [
    {
        id: 1,
        title: 'Invite 1 friend',
        reward: 50000,
        refferals: 1
    },
    {
        id: 2,
        title: 'Invite 3 friend',
        reward: 150000,
        refferals: 3
    },
    {
        id: 3,
        title: 'Invite 5 friend',
        reward: 250000,
        refferals: 5
    },
    {
        id: 4,
        title: 'Invite 7 friend',
        reward: 500000,
        refferals: 7
    },
    {
        id: 5,
        title: 'Invite 9 friend',
        reward: 750000,
        refferals: 9
    },
    {
        id: 6,
        title: 'Invite 12 friend',
        reward: 1000000,
        refferals: 12
    },
];


const getTaskDetailsById = (id) => {
    const task = inviteTasks.find(task => task.id === id);
    return task ? { reward: task.reward, refferals: task.refferals } : null;
};

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

        let profilePhoto = 'not set';


        if (isUser && isUser.profilePic === 'not set') {
            const photoResponse = await getProfilePhoto(telegramId);
            if (photoResponse.success) {
                isUser.profilePic = photoResponse.photo;
                isUser.save();
            }
            return res.status(200).json({
                status: 'success',
                mes: 'true'
            });
        }

        if (!isUser) {
            const res = await getProfilePhoto(telegramId);
            if (res.success) {
                profilePhoto = res.photo;
            }
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
                    reward: balance,
                    profilePic: profilePhoto
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

        let balanceToAdd;
        if (!isUser) {
            isUser = new UserModel({
                telegramId,
                firstName,
                lastName,
                username,
                pic: null,
                level: 0,
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
            let res1, res2, res3, res4;
            res1 = resetBoosters(isUser);
            res2 = resetDailyRewards(res1);
            res3 = resetComboCards(res2);

            if (isUser.coinsPerMinute.value !== 0) {
                balanceToAdd = await getCoinsPerMinute(res3);
            }

            await res3.save();
            isUser = res3;

            if (isUser.unlimitedTaps.status === true) {
                const lastClaimed = isUser.unlimitedTaps.lastClaimed;
                const is2mins = check2min(lastClaimed);

                if (!is2mins) {
                    isUser.unlimitedTaps.status = false;
                    await isUser.save();
                }
            }
        }

        if (balanceToAdd > 0) {
            return res.status(200).json({
                status: 'success',
                message: 'User initialized successfully!',
                user: isUser,
                cpm: true,
                balanceToAdd: balanceToAdd
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'User initialized successfully!',
                user: isUser,
                cpm: false,
                balanceToAdd: 0
            });
        }

    } catch (error) {
        console.error("Error during user initialization:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
}

const createUser = async (telegramId, firstName, lastName, username, profilePhoto, balance) => {
    const newUser = new UserModel({
        telegramId,
        firstName,
        lastName,
        username,
        pic: null,
        level: 0,
        balance,
        energy: { level: 0, limit: 1500 },
        multitaps: { level: 0, value: 1 },
        unlimitedTaps: { status: false, available: 5 },
        energyRefill: { available: 3 },
        dailyReward: { claimed: [], day: 0, reward: 500 },
        coinsPerMinute: { value: 0, lastClaimed: currentDate },
        referrals: [],
        profilePic: profilePhoto
    });
    await newUser.save();
};

const resetUser = async (user) => {
    let res1 = resetBoosters(user);
    let res2 = resetDailyRewards(res1);
    let res3 = resetComboCards(res2);
    await res3.save();
    return res3;
};

const handleCoinsPerMinute = async (user) => {
    if (user.coinsPerMinute.value !== 0) {
        return await getCoinsPerMinute(user);
    }
    return user;
};

const updateReferrals = async (referrerId, telegramId, firstName, lastName, balance, profilePhoto) => {
    const referrer = await UserModel.findOne({ telegramId: referrerId });
    if (!referrer) {
        console.log("Referrer not found!");
        return;
    }

    const referralData = {
        telegramId,
        firstName,
        lastName,
        reward: balance,
        profilePic: profilePhoto
    };
    referrer.referrals.push(referralData);
    referrer.balance += balance;

    const socketId = userSocketMap.get(referrer.telegramId);
    if (socketId) {
        const io = getIo();
        io.to(socketId).emit('refresh', referrer);
    }
    await referrer.save();
};

exports.claimCPM = async (req, res) => {
    try {
        const { userId, balanceToAdd } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        const currentDate = new Date();

        user.balance += balanceToAdd;
        user.coinsPerMinute.lastClaimed = currentDate;

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Cpm Claimed Succesfuly!',
            balance: user.balance
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
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

        if (user.energy.level === energyLimits.length - 1) {
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

        if (user.multitaps.level === multitapValues.length - 1) {
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

            const alreadyBoosterEnabled = check30sec(lastClaimed);

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
            message: 'Unlimited taps for 30 Seconds!',
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
            user.dailyReward.date = currentDate.toUTCString();
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
                const isOneWeek = check1day(lastDateClaimed);
                console.log('is one week', isOneWeek)
                if (!isOneWeek) {
                    console.log('----> Reseting one week passed!');
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
                    console.log('--> Claimed Reward for day 7!');
                    return res.status(200).json({
                        stauts: 'failed',
                        message: 'You have already claimed todays reward!'
                    })
                }
            }

            // check 24 hours if the day is continuing
            const is24hrs = check1day(lastDateClaimed);

            console.log('Last Date Claimed', lastDateClaimed);
            console.log('is 24 hrs', is24hrs);
            if (is24hrs) {
                console.log('--> within one day continuing!');
                return res.status(200).json({
                    status: 'failed',
                    message: 'You have already claimed todays reward'
                })
            } else {
                const is48hrs = check2days(lastDateClaimed);
                if (!is48hrs) {
                    console.log('--> Daily Streak break resetting!');
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
                    console.log('--> Claiming todays reward!');
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
        console.log("Error claiming daily reward", error);
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

exports.fetchUserProjects = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const projects = await ProjectModel.find({}, '_id name fromColor toColor tgeDate icon levels').lean();

        const categorizedProjects = {
            current: [],
            tge: [],
            missed: []
        };

        const now = new Date();

        const response = projects.map(project => {
            const userProject = user.projects.find(up => up._id && up._id.equals(project._id));
            const userWallet = user.wallet.find(w => w._id && w._id.equals(project._id));


            let customIndex = 0;
            const currentLevel = userProject?.level || null;
            if (currentLevel !== undefined) {
                customIndex = currentLevel + 1;
            }

            const levelCost = project.levels[customIndex]?.cost || 'max';
            const levelReward = project.levels[customIndex]?.reward || 'max';
            const levelCpm = project.levels[customIndex]?.cpm || 'max';

            const enrichedProject = {
                ...project,
                userData: userProject ? {
                    level: userProject.level + 1,
                    nextLevelCost: levelCost,
                    nextLevelReward: levelReward,
                    nextLevelCpm: levelCpm
                } : null,
                walletData: userWallet ? {
                    balance: userWallet.balance,
                } : null,
            };

            if (!project.tgeDate || new Date(project.tgeDate) > now) {
                categorizedProjects.current.push(enrichedProject);
            } else if (project.tgeDate && new Date(project.tgeDate) <= now) {
                if (enrichedProject.userData) {
                    categorizedProjects.tge.push(enrichedProject);
                } else {
                    categorizedProjects.missed.push(enrichedProject);
                }
            }
            return enrichedProject;
        });

        res.status(200).json({
            status: 'success',
            projects: categorizedProjects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        });
    }
};

exports.upgradeUserProjectLevel = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        const user = await UserModel.findById(userId);
        const project = await ProjectModel.findById(projectId);

        if (!user || !project) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or project not found!'
            });
        }

        if (project.tgeDate && new Date(project.tgeDate) < new Date()) {
            return res.status(200).json({
                status: 'failed',
                message: 'Token Generation Event Started!'
            });
        }

        let userProject = user.projects?.find(up => up._id.toString() === projectId);

        const maxLevel = project.levels.length - 1;
        const currentLevel = userProject?.level ? userProject.level : undefined;

        if (currentLevel >= maxLevel) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project is already at the maximum level!'
            });
        }

        let customIndex = 0;
        if (currentLevel !== undefined) {
            customIndex = currentLevel + 1;
        }

        const levelCost = project.levels[customIndex]?.cost;
        const levelReward = project.levels[customIndex]?.reward;
        const levelCpm = project.levels[customIndex]?.cpm;

        if (!levelCost || !levelReward || !levelCpm) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid level data!'
            });
        }

        if (user.balance < levelCost) {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient balance to upgrade project level!',
                upgradeCost: levelCost
            });
        }



        user.balance -= levelCost;
        user.coinsPerMinute.value += levelCpm;

        const projectWallet = user.wallet?.find(w => w._id.toString() === projectId);
        if (projectWallet) {
            projectWallet.balance += levelReward;
        } else {
            user.wallet.push({
                _id: projectId,
                balance: levelReward
            });
        }

        if (userProject) {
            if (userProject?.level || userProject.level === 0) {
                userProject.level = userProject.level + 1;
            } else {
                userProject.level = 0;
            }
        } else {
            const projectData = {
                _id: projectId,
                level: 0
            }
            user.projects.push(projectData);
        }

        let playAnimation = false;

        if (project.card) {
            if (user.comboCards.length <= 2) {
                if (user.comboCards.some(card => card.cardId.toString() === project._id.toString())) {
                    console.log("Combo card already claimed!");
                } else {
                    console.log("Claiming Combo!");
                    const data = {
                        cardId: project._id,
                        name: project.name,
                        fromColor: project.fromColor,
                        toColor: project.toColor,
                        icon: project.icon.data
                    };
                    playAnimation = 1;
                    user.comboCards.push(data);
                    if (user.comboCards.length === 2) {
                        user.balance += 50000;
                        playAnimation = 2;
                    }
                }
            }
        }

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Project level upgraded successfully!',
            balance: user.balance,
            cpm: user.coinsPerMinute.value,
            wallet: user.wallet,
            projects: user.projects,
            comboCards: user.comboCards,
            playAnimation: playAnimation
        });
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.userOneProjectDetails = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        if (!userId || !projectId) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID and Project ID are required.',
            });
        }

        const user = await UserModel.findById(userId);
        const project = await ProjectModel.findById(projectId);
        if (!user || !project) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or Project not found!',
            });
        }

        let userLevel = null;
        const userProject = user.projects.find((p) => p._id.toString() === projectId);
        if (userProject) {
            if (userProject?.level === 0) {
                userLevel = 0;
            } else {
                userLevel = userProject.level || null;
            }
        }

        let nextLevelCost = 0, nextLevelReward = 0, nextLevelCpm = 0;

        if (userLevel !== null && userLevel < project.levels.length - 1) {
            const nextLevel = project.levels[userLevel + 1];
            nextLevelCost = nextLevel.cost || 0;
            nextLevelReward = nextLevel.reward || 0;
            nextLevelCpm = nextLevel.cpm || 0;
        } else if (userLevel === null && project.levels.length > 0) {
            const firstLevel = project.levels[0];
            nextLevelCost = firstLevel.cost || 0;
            nextLevelReward = firstLevel.reward || 0;
            nextLevelCpm = firstLevel.cpm || 0;
        }

        const displayUserLevel =
            userLevel === project.levels.length - 1 ? 'max' : userLevel === null ? null : userLevel;

        const wallet = user.wallet.find((w) => w._id.toString() === projectId);
        const walletBalance = wallet ? wallet.balance : 0;

        let updatedTasks = [];
        if (project.tasks && project.tasks.length > 0) {
            updatedTasks = project.tasks.map((task) => {
                const userTask = userProject?.tasks?.find((t) => t.taskId.toString() === task._id.toString());

                let taskResponse = {
                    ...task._doc,
                    claimedStatus: userTask?.claimedStatus || false,
                };

                if (userTask?.claimedStatus === 'pending') {
                    taskResponse.claimedDate = userTask.claimedDate;
                }

                return taskResponse;
            });
        }

        console.log('Display User Level', displayUserLevel);

        const userData = {
            userLevel: displayUserLevel === 'max'
                ? 'max'
                : (displayUserLevel === null || displayUserLevel === undefined ? 0 : (displayUserLevel + 1)),
            walletBalance,
            nextLevelCost,
            nextLevelReward,
            nextLevelCpm,
        };

        return res.status(200).json({
            status: 'success',
            userData: {
                ...userData,
            },
            project: {
                ...project._doc,
                tasks: updatedTasks,
            },
        });
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
        });
    }
};

exports.claimProjectTask = async (req, res) => {
    try {
        const { userId, projectId, taskId } = req.body;

        // Validate input
        if (!userId || !projectId || !taskId) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID, Project ID, and Task ID are required.',
            });
        }

        // Fetch user and project data
        const user = await UserModel.findById(userId);
        const project = await ProjectModel.findById(projectId);
        const projectTask = project?.tasks.find((t) => t._id.toString() === taskId);

        if (!user || !project || !projectTask) {
            return res.status(404).json({
                status: 'failed',
                message: 'User, Project, or Task not found!',
            });
        }

        let userProject = user.projects.find((p) => p._id.toString() === projectId);

        if (!userProject) {
            const newTask = {
                taskId,
                claimedDate: new Date(),
                claimedStatus: "pending",
            };

            const newProject = {
                _id: projectId,
                level: null,
                tasks: [newTask],
            };

            user.projects.push(newProject);
            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'Reward claim requested, comeback after 30 minutes. 1',
                claimedStatus: 'pending',
                claimedDate: newTask.claimedDate,
            });
        }

        let userTask = userProject.tasks.find((t) => t.taskId.toString() === taskId);

        if (!userTask) {
            userProject.tasks.push({
                taskId,
                claimedDate: new Date(),
                claimedStatus: "pending",
            });

            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'Reward claim requested, comeback after 30 minutes. 2',
                claimedStatus: 'pending',
                claimedDate: new Date(),
            });
        }

        if (userTask.claimedStatus === 'claimed') {
            return res.status(200).json({
                status: 'failed',
                message: 'Reward already claimed!',
                claimedStatus: 'claimed',
            });
        } else if (userTask.claimedStatus === 'pending') {
            const currentTime = new Date();
            const timeDifference = (currentTime - new Date(userTask.claimedDate)) / (1000 * 60);

            if (timeDifference < 30) {
                return res.status(200).json({
                    status: 'success',
                    message: `Comeback after ${30 - Math.floor(timeDifference)} minutes!`,
                    claimedStatus: 'pending',
                    claimedDate: userTask.claimedDate,  // Send the claimed time
                });
            } else {
                // Update task status to claimed
                userTask.claimedStatus = 'claimed';
                userTask.claimedDate = currentTime;

                const reward = projectTask.reward || 0;
                let walletEntry = user.wallet.find((w) => w._id.toString() === projectId);

                if (walletEntry) {
                    walletEntry.balance += reward;
                } else {
                    user.wallet.push({
                        _id: projectId,
                        balance: reward,
                    });
                }

                await user.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Task successfully claimed!',
                    claimedStatus: 'claimed',
                });
            }
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
            claimedStatus: 'error',
        });
    }
};

exports.claimUserTask = async (req, res) => {
    try {
        const { userId, taskId, taskType } = req.body;

        if (!userId || !taskId) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID, and Task ID are required.',
            });
        }

        const user = await UserModel.findById(userId);

        let task;
        if (taskType === 'social') {
            task = await SocialTaskModel.findById(taskId);
        } else if (taskType === 'daily') {
            task = await DailyTaskModel.findById(taskId);
        } else if (taskType === 'partner') {
            task = await PartnerTaskModel.findById(taskId);
        }

        if (!user || !task) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or Task not found!',
            });
        }

        let userTask = user.tasks.find((t) => t.taskId.toString() === taskId);

        if (!userTask) {
            user.tasks.push({
                taskId,
                claimedDate: new Date(),
                claimedStatus: "pending",
            });

            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'Reward claim requested, comeback after 30 minutes.',
                claimedStatus: 'pending',
                claimedDate: new Date(),
            });
        }

        if (userTask.claimedStatus === 'claimed') {
            return res.status(200).json({
                status: 'failed',
                message: 'Reward already claimed!',
                claimedStatus: 'claimed',
            });
        } else if (userTask.claimedStatus === 'pending') {
            const currentTime = new Date();
            const timeDifference = (currentTime - new Date(userTask.claimedDate)) / (1000 * 60);

            if (timeDifference < 30) {
                return res.status(200).json({
                    status: 'success',
                    message: `Comeback after ${30 - Math.floor(timeDifference)} minutes!`,
                    claimedStatus: 'pending',
                    claimedDate: userTask.claimedDate,
                });
            } else {
                userTask.claimedStatus = 'claimed';
                userTask.claimedDate = currentTime;

                const reward = task.reward || 0;

                user.balance += reward;

                await user.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Task successfully claimed!',
                    claimedStatus: 'claimed',
                });
            }
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
            claimedStatus: 'error',
        });
    }
};

exports.fetchUserTasks = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!',
            });
        }

        const socialTasks = await SocialTaskModel.find({ status: true });
        const dailyTasks = await DailyTaskModel.find({ status: true });
        const partnerTasks = await PartnerTaskModel.find({ status: true });

        const enhancedSocialTasks = socialTasks.map((task) => {
            const userTask = user.tasks.find(
                (userTask) =>
                    userTask.taskId && userTask.taskId.toString() === task._id.toString()
            );

            if (userTask) {
                return {
                    ...task.toObject(),
                    claimedStatus: userTask.claimedStatus || false,
                    claimedDate: userTask.claimedDate || null,
                };
            }

            return {
                ...task.toObject(),
                claimedStatus: false,
            };
        });

        const enhancedDailyTasks = dailyTasks.map((task) => {
            const userTask = user.tasks.find(
                (userTask) =>
                    userTask.taskId && userTask.taskId.toString() === task._id.toString()
            );

            if (userTask) {
                return {
                    ...task.toObject(),
                    claimedStatus: userTask.claimedStatus || false,
                    claimedDate: userTask.claimedDate || null,
                };
            }

            return {
                ...task.toObject(),
                claimedStatus: false,
            };
        });

        const enhancedPatnerTasks = partnerTasks.map((task) => {
            const userTask = user.tasks.find(
                (userTask) =>
                    userTask.taskId && userTask.taskId.toString() === task._id.toString()
            );

            if (userTask) {
                return {
                    ...task.toObject(),
                    claimedStatus: userTask.claimedStatus || false,
                    claimedDate: userTask.claimedDate || null,
                };
            }

            return {
                ...task.toObject(),
                claimedStatus: false,
            };
        });

        return res.status(200).json({
            status: 'success',
            socialTasks: enhancedSocialTasks,
            dailyTasks: enhancedDailyTasks,
            partnerTasks: enhancedPatnerTasks,
        });
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
        });
    }
};

exports.fetchUserKols = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const kols = await KolModel.find({}, '_id name fromColor toColor tgeDate icon logo levels').lean();

        const response = kols.map(kol => {
            const userKol = user.kols.find(up => up._id && up._id.equals(kol._id));

            let customIndex = 0;
            const currentLevel = userKol?.level || null;
            if (currentLevel !== undefined) {
                customIndex = currentLevel + 1;
            }

            const levelCost = kol.levels[customIndex]?.cost || 'max';
            const levelCpm = kol.levels[customIndex]?.cpm || 'max';


            const enrichedProject = {
                ...kol,
                userData: userKol ? {
                    level: userKol.level + 1,
                    nextLevelCost: levelCost,
                    nextLevelCpm: levelCpm
                } : null,
            };
            return enrichedProject;
        });

        res.status(200).json({
            status: 'success',
            response: response
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchOneKolDetails = async (req, res) => {
    try {
        const { kolId, userId } = req.body;

        const kol = await KolModel.findById(kolId, '_id name fromColor toColor tgeDate icon logo levels').lean();
        if (!kol) {
            return res.status(404).json({
                status: 'failed',
                message: 'Kol not found'
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const userKol = user.kols.find(up => up._id && up._id.equals(kol._id));

        let customIndex = 0;
        const currentLevel = userKol?.level || null;
        if (currentLevel !== undefined) {
            customIndex = currentLevel + 1;
        }

        const levelCost = kol.levels[customIndex]?.cost || 'max';
        const levelCpm = kol.levels[customIndex]?.cpm || 'max';

        const enrichedKol = {
            ...kol,
            userData: userKol ? {
                level: userKol.level + 1,
                nextLevelCost: levelCost,
                nextLevelCpm: levelCpm
            } : null,
        };

        res.status(200).json({
            status: 'success',
            message: 'Kol defailed fetch succesfuly!',
            updatedKol: enrichedKol
        });

    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.upgradeUserKolLevel = async (req, res) => {
    try {
        const { userId, kolId } = req.body;

        const user = await UserModel.findById(userId);
        const kol = await KolModel.findById(kolId);

        if (!user || !kol) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or kol not found!'
            });
        }

        let userKol = user.kols?.find(up => up._id.toString() === kolId);

        const maxLevel = kol.levels.length - 1;
        const currentLevel = userKol ? userKol.level : undefined;

        if (currentLevel >= maxLevel) {
            return res.status(200).json({
                status: 'failed',
                message: 'Kol is already at the maximum level!'
            });
        }

        let customIndex = 0;
        if (currentLevel !== undefined) {
            customIndex = currentLevel + 1;
        }

        const levelCost = kol.levels[customIndex]?.cost;
        const levelCpm = kol.levels[customIndex]?.cpm;

        if (!levelCost || !levelCpm) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid level data!'
            });
        }

        if (user.balance < levelCost) {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient balance to upgrade kol level!',
                upgradeCost: levelCost
            });
        }



        user.balance -= levelCost;
        user.coinsPerMinute.value += levelCpm;

        if (userKol) {
            userKol.level = userKol.level + 1;
        } else {
            const kolData = {
                _id: kolId,
                level: 0
            }
            user.kols.push(kolData);
        }


        let playAnimation = false;
        if (kol.card) {
            if (user.comboCards.length <= 2) {
                if (user.comboCards.some(card => card.cardId.toString() === kol._id.toString())) {
                    console.log("Combo card already claimed!");
                } else {
                    console.log("Claiming Combo!");
                    const data = {
                        cardId: kol._id,
                        name: kol.name,
                        fromColor: kol.fromColor,
                        toColor: kol.toColor,
                        icon: kol.icon.data
                    };
                    playAnimation = 1;
                    user.comboCards.push(data);
                    if (user.comboCards.length === 2) {
                        user.balance += 50000;
                        playAnimation = 2;
                    }
                }
            }
        }

        await user.save();

        const userData = {
            level: userKol?.level ? userKol.level + 1 : 1,
            nextLevelCost: kol.levels[customIndex + 1]?.cost,
            nextLevelCpm: kol.levels[customIndex + 1]?.cpm
        }

        const updatedKol = {
            ...kol.toObject(),
            userData: (
                Array.isArray(kol?.levels) &&
                (userKol?.level + 1) >= kol.levels.length
            )
                ? {
                    ...userData,
                    level: kol.levels.length,
                    nextLevelCost: 'MAX',
                    nextLevelCpm: 'MAX'
                }
                : {
                    ...userData,
                }
        };

        return res.status(200).json({
            status: 'success',
            message: 'Kol level upgraded successfully!',
            balance: user.balance,
            cpm: user.coinsPerMinute.value,
            kols: user.kols,
            comboCards: user.comboCards,
            playAnimation: playAnimation,
            updatedKol: updatedKol
        });
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.fetchVcs = async (req, res) => {
    try {
        const vcs = await ProjectModel.find();
        if (vcs.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Vcs not found!'
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Vcs found!',
            vcs: vcs
        });
    } catch (error) {
        console.log("Internal Server Error!");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchUserVcs = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const vcs = await VcModel.find({}, '_id name fromColor toColor tgeDate icon logo levels').lean();

        const response = vcs.map(vc => {
            const userVc = user.vcs.find(up => up._id && up._id.equals(vc._id));


            let customIndex = 0;
            const currentLevel = userVc?.level || null;
            if (currentLevel !== undefined) {
                customIndex = currentLevel + 1;
            }

            const levelCost = vc.levels[customIndex]?.cost || 'max';
            const levelReward = vc.levels[customIndex]?.reward || 'max';
            const levelCpm = vc.levels[customIndex]?.cpm || 'max';

            const enrichedProject = {
                ...vc,
                userData: userVc ? {
                    level: userVc.level + 1,
                    nextLevelCost: levelCost,
                    nextLevelReward: levelReward,
                    nextLevelCpm: levelCpm
                } : null,
            };
            return enrichedProject;
        });

        res.status(200).json({
            status: 'success',
            response: response
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.upgradeUserVcLevel = async (req, res) => {
    try {
        const { userId, vcId } = req.body;

        const user = await UserModel.findById(userId);
        const vc = await VcModel.findById(vcId);

        if (!user || !vc) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or vc not found!'
            });
        }

        let userVc = user.vcs?.find(up => up._id.toString() === vcId);

        const maxLevel = vc.levels.length - 1;
        const currentLevel = userVc ? userVc.level : undefined;

        if (currentLevel >= maxLevel) {
            return res.status(200).json({
                status: 'failed',
                message: 'Vc is already at the maximum level!'
            });
        }

        let customIndex = 0;
        if (currentLevel !== undefined) {
            customIndex = currentLevel + 1;
        }

        const levelCost = vc.levels[customIndex]?.cost;
        const levelCpm = vc.levels[customIndex]?.cpm;

        if (!levelCost || !levelCpm) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid level data!'
            });
        }

        if (user.balance < levelCost) {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient balance to upgrade vc level!',
                upgradeCost: levelCost
            });
        }



        user.balance -= levelCost;
        user.coinsPerMinute.value += levelCpm;

        if (userVc) {
            userVc.level = userVc.level + 1;
        } else {
            const vcData = {
                _id: vcId,
                level: 0
            }
            user.vcs.push(vcData);
        }

        let playAnimation = false;

        if (vc.card) {
            if (user.comboCards.length <= 2) {
                if (user.comboCards.some(card => card.cardId.toString() === vc._id.toString())) {
                    console.log("Combo card already claimed!");
                } else {
                    console.log("Claiming Combo!");
                    const data = {
                        cardId: vc._id,
                        name: vc.name,
                        fromColor: vc.fromColor,
                        toColor: vc.toColor,
                        icon: vc.icon.data
                    };
                    playAnimation = 1;
                    user.comboCards.push(data);
                    if (user.comboCards.length === 2) {
                        user.balance += 50000;
                        playAnimation = 2;
                    }
                }
            }
        }

        await user.save();


        const userData = {
            level: userVc?.level ? userVc.level + 1 : 1,
            nextLevelCost: vc.levels[customIndex + 1]?.cost,
            nextLevelCpm: vc.levels[customIndex + 1]?.cpm
        }

        const updatedVc = {
            ...vc.toObject(),
            userData: (
                Array.isArray(vc?.levels) &&
                (userVc?.level + 1) >= vc.levels.length
            )
                ? {
                    ...userData,
                    level: vc.levels.length,
                    nextLevelCost: 'MAX',
                    nextLevelCpm: 'MAX'
                }
                : {
                    ...userData,
                }
        };

        return res.status(200).json({
            status: 'success',
            message: 'Vc level upgraded successfully!',
            balance: user.balance,
            cpm: user.coinsPerMinute.value,
            vcs: user.vcs,
            comboCards: user.comboCards,
            playAnimation: playAnimation,
            updatedVc: updatedVc
        });
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.fetchPatners = async (req, res) => {
    try {
        const patners = await ProjectModel.find();
        if (patners.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Patners not found!'
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Patners found!',
            patners: patners
        });
    } catch (error) {
        console.log("Internal Server Error!");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchUserPatners = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const patners = await PatnerModel.find({}, '_id name fromColor toColor tgeDate icon logo levels').lean();

        const response = patners.map(patner => {
            const userPatner = user.patners.find(up => up._id && up._id.equals(patner._id));

            let customIndex = 0;
            const currentLevel = userPatner?.level || null;
            if (currentLevel !== undefined) {
                customIndex = currentLevel + 1;
            }

            const levelCost = patner.levels[customIndex]?.cost || 'max';
            const levelReward = patner.levels[customIndex]?.reward || 'max';
            const levelCpm = patner.levels[customIndex]?.cpm || 'max';


            const enrichedProject = {
                ...patner,
                userData: userPatner ? {
                    level: userPatner.level + 1,
                    nextLevelCost: levelCost,
                    nextLevelReward: levelReward,
                    nextLevelCpm: levelCpm
                } : null,
            };
            return enrichedProject;
        });

        res.status(200).json({
            status: 'success',
            response: response
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.upgradeUserPatnerLevel = async (req, res) => {
    try {
        const { userId, patnerId } = req.body;

        const user = await UserModel.findById(userId);
        const patner = await PatnerModel.findById(patnerId);

        if (!user || !patner) {
            return res.status(404).json({
                status: 'failed',
                message: 'User or patner not found!'
            });
        }

        let userPatner = user.patners?.find(up => up._id.toString() === patnerId);

        const maxLevel = patner.levels.length - 1;
        const currentLevel = userPatner ? userPatner.level : undefined;

        if (currentLevel >= maxLevel) {
            return res.status(200).json({
                status: 'failed',
                message: 'Patner is already at the maximum level!'
            });
        }

        let customIndex = 0;
        if (currentLevel !== undefined) {
            customIndex = currentLevel + 1;
        }

        const levelCost = patner.levels[customIndex]?.cost;
        const levelCpm = patner.levels[customIndex]?.cpm;

        if (!levelCost || !levelCpm) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid level data!'
            });
        }

        if (user.balance < levelCost) {
            return res.status(200).json({
                status: 'failed',
                message: 'Insufficient balance to upgrade patner level!',
                upgradeCost: levelCost
            });
        }



        user.balance -= levelCost;
        user.coinsPerMinute.value += levelCpm;

        if (userPatner) {
            userPatner.level = userPatner.level + 1;
        } else {
            const patnerData = {
                _id: patnerId,
                level: 0
            }
            user.patners.push(patnerData);
        }

        let playAnimation = false;

        if (patner.card) {
            if (user.comboCards.length <= 2) {
                if (user.comboCards.some(card => card.cardId.toString() === patner._id.toString())) {
                    console.log("Combo card already claimed!");
                } else {
                    console.log("Claiming Combo!");
                    const data = {
                        cardId: patner._id,
                        name: patner.name,
                        fromColor: patner.fromColor,
                        toColor: patner.toColor,
                        icon: patner.icon.data
                    };
                    playAnimation = 1;
                    user.comboCards.push(data);
                    if (user.comboCards.length === 2) {
                        user.balance += 50000;
                        playAnimation = 2;
                    }
                }
            }
        }

        await user.save();

        const userData = {
            level: userPatner?.level ? userPatner.level + 1 : 1,
            nextLevelCost: patner.levels[customIndex + 1]?.cost,
            nextLevelCpm: patner.levels[customIndex + 1]?.cpm
        }

        const updatedPatner = {
            ...patner.toObject(),
            userData: (
                Array.isArray(patner?.levels) &&
                (userPatner?.level + 1) >= patner.levels.length
            )
                ? {
                    ...userData,
                    level: patner.levels.length,
                    nextLevelCost: 'MAX',
                    nextLevelCpm: 'MAX'
                }
                : {
                    ...userData,
                }
        };


        return res.status(200).json({
            status: 'success',
            message: 'Patner level upgraded successfully!',
            balance: user.balance,
            cpm: user.coinsPerMinute.value,
            patners: user.patners,
            comboCards: user.comboCards,
            playAnimation: playAnimation,
            updatedPatner: updatedPatner
        });
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.fetchUserInviteFriends = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            });
        }

        let inviteTasksWithStatus = [];

        inviteTasks.map((task, i) => {

        })
        return res.status(200).json({
            status: 'success',
            message: 'Tasks fetched succesfuly!',
            inviteFriendsTasks: inviteTasks
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.fetchUserInviteFriends = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!',
            });
        }

        const inviteTasksWithStatus = inviteTasks.map((task) => {
            const hasClaimed = user.friends.length >= task.refferals;
            return {
                ...task,
                claimed: hasClaimed,
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Tasks fetched successfully!',
            inviteFriendsTasks: inviteTasksWithStatus,
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error',
        });
    }
};

exports.claimInviteFriendsReward = async (req, res) => {
    try {
        const { userId, rewardId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (user.friends.includes(rewardId)) {
            return res.status(200).json({
                status: 'failed',
                message: 'Already reward claimed!'
            })
        }

        const taskDetails = getTaskDetailsById(rewardId);


        if (user.referrals.length >= taskDetails.refferals) {
            user.friends.push(rewardId);
            user.balance += taskDetails.reward;
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Reward Claimed Succesfuly!'
            })
        } else {
            return res.status(200).json({
                status: 'failed',
                message: `You have ${user.referrals.length} refferals!`
            })
        }
    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.updateWalletAddress = async (req, res) => {
    try {
        const { userId, walletAddress } = req.body;

        if (!userId || !walletAddress) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID and Wallet Address are required!'
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found!'
            });
        }

        if (user.walletAddress) {
            user.walletAddress = walletAddress;
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Wallet Connected successfully!'
            });
        } else {
            user.walletAddress = walletAddress;
            await user.save();
            return res.status(200).json({
                status: 'success',
                message: 'Wallet Connected successfully!',
                walletAddress: user.walletAddress
            });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.getServerTimeStamp = async (req, res) => {
    try {
        const timestamp = Date.now();
        const dateTime = new Date(timestamp).toISOString();
        return res.status(200).json({
            status: 'success',
            message: 'Timestamp with date & time fetched successfully!',
            serverTime: {
                timestamp,
                dateTime
            }
        });
    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
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

exports.updateAllTimeBalance = async (req, res) => {
    try {
        const { userId, balance } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        let tempAllTimeBalance = 0;

        if (user.allTimeBalance) {
            if (user.allTimeBalance > balance) {
                tempAllTimeBalance = user.allTimeBalance;
            } else {
                tempAllTimeBalance = balance;
            }
        } else {
            tempAllTimeBalance = balance;
        }

        user.allTimeBalance = tempAllTimeBalance;

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'All Time Balance updated succesfuly!'
        })

    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}
