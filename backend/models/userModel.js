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
        type: String,
        default: '0'
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
        available: {
            type: Number,
            default: 5
        },
        lastClaimed: {
            type: Date,
            default: Date.now
        }
    },
    energyRefill: {
        available: {
            type: Number,
            default: 3
        },
        lastClaimed: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
