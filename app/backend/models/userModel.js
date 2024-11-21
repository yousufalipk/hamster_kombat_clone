const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    username: String,
    pic: {
        type: String,
        default: null
    },
    level: {
        type: String,
        default: 'silver'
    },
    currentRank: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    energy: {
        level: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 1500
        }
    },
    multitaps: {
        level: {
            type: Number,
            default: 0
        },
        value: {
            type: Number,
            default: 1
        }
    },
    unlimitedTaps: {
        status: {
            type: Boolean,
            default: false
        },
        available: {
            type: Number,
            default: 5
        },
        lastClaimed: {
            type: Date,
            default: null
        }
    },
    energyRefill: {
        available: {
            type: Number,
            default: 3
        },
        lastClaimed: {
            type: Date,
            default: null
        }
    },
    dailyReward: {
        claimed: {
            type: Array,
            defauly: []
        },
        date: {
            type: Date,
            default: null
        },
        day: {
            type: Number,
            default: 0
        },
        reward: {
            type: Number,
            default: 500
        }
    },
    coinsPerMinute: {
        value: {
            type: Number,
            default: 0
        },
        lastClaimed: {
            type: Date,
            default: null
        }
    },
    referrals: [
        {
            telegramId: {
                type: String
            },
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            reward: {
                type: Number,
            }
        }
    ],
    profilePic: {
        type: String,
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
