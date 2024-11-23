const mongoose = require('mongoose');

const kolsSchema = new mongoose.Schema({
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

const kols = mongoose.model('Kols', kolsSchema, 'kols');

module.exports = kols;