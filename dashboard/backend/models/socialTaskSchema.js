const mongoose = require('mongoose');

const socialTaskSchema = new mongoose.Schema({
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

const socialTasks = mongoose.model('socialTasks', socialTaskSchema, 'socialTasks');

module.exports = socialTasks;