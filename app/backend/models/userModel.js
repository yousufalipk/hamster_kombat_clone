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
            },
            profilePic: {
                type: String,
            }
        }
    ],
    profilePic: {
        type: String,
    },
    wallet: [{
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        },
        balance: {
            type: Number,
            default: 0
        }
    }],
    projects: [{
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        },
        level: {
            type: Number,
            default: null
        }
    }],
    kols: [{
        kolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'kols'
        },
        level: {
            type: Number,
            default: null
        }
    }],
    vcs: [{
        vcId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vcs'
        },
        level: {
            type: Number,
            default: null
        }
    }],
    patners: [{
        PatnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patners'
        },
        level: {
            type: Number,
            default: null
        }
    }],
    comboCards: [{
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String,
        },
        fromColor: {
            type: String,
        },
        toColor: {
            type: String,
        },
        icon: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
