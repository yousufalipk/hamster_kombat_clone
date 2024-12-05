const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    name: {
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
    fromColor: {
        type: String,
        required: true,
    },
    toColor: {
        type: String,
        required: true,
    },
    lineFromColor: {
        type: String,
        required: true,
    },
    lineToColor: {
        type: String,
        required: true,
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
        baseReward: {
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
        rewardMultiplier: {
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
            reward: {
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
    tasks: [
        {
            taskType: {
                type: String,
                default: null
            },
            iconType: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: true
            },
            link: {
                type: String,
                default: true
            },
            reward: {
                type: Number,
                default: 0
            }
        }
    ],
    tgeDate: {
        type: Date,
        default: null
    },
    tge: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Projects = mongoose.model('Projects', projectsSchema, 'projects');

module.exports = Projects;