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
            iconType: {
                type: String,
                default: null
            },
            title: {
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