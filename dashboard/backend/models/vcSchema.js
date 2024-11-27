const mongoose = require('mongoose');

const vcsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fromColor: {
        type: String,
        required: true,
    },
    toColor: {
        type: String,
        required: true,
    },
    icon: {
        name: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
    },
    logo: {
        name: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
    },
    numberOfLevel: {
        type: Number,
        default: 0
    },
    baseValues: {
        baseCost: {
            type: Number,
            default: 0
        },
        baseCpm: {
            type: Number,
            default: 0
        }
    },
    multipliers: {
        costMultiplier: {
            type: Number,
            default: 0
        },
        cpmMultiplier: {
            type: Number,
            default: 0
        }
    },
    levels: [
        {
            level: {
                type: Number,
                default: 0,
            },
            cost: {
                type: Number,
                default: 0,
            },
            cpm: {
                type: Number,
                default: 0,
            },
        },
    ],
    card: {
        type: Boolean,
        default: false
    },
    conditions: [
    ]
}, {
    timestamps: true,
});

const vcs = mongoose.model('Vcs', vcsSchema, 'VcsSchema');

module.exports = vcs;