const mongoose = require('mongoose');

const patnerSchema = new mongoose.Schema({
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
    },
    priority: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const patnerTasks = mongoose.model('patnerTasks', patnerSchema, 'patnerTasks');

module.exports = patnerTasks;