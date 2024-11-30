const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});

const tasks = mongoose.model('Tasks', tasksSchema, 'tasks');

module.exports = tasks;