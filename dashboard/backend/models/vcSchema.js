const mongoose = require('mongoose');

const VcSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
});

const vcs = mongoose.model('Vcs', VcSchema, 'vcs');

module.exports = vcs;