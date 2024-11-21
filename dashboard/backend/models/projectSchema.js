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
                type: String,
                default: '0',
            },
            cost: {
                type: String,
                default: '0',
            },
        },
    ],
    card: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Projects = mongoose.model('Projects', projectsSchema, 'projects');

module.exports = Projects;