const mongoose = require('mongoose');

const broadcastingSchema = new mongoose.Schema({
    failedUsers: [{
        telegramId: {
            type: String,
            required: true
        }
    }],
    noOfFailedUsers: {
        type: Number,
        required: true,
    },
    successUsers: [{
        telegramId: {
            type: String,
            required: true
        }
    }],
    noOfSuccessUsers: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const broadcasting = mongoose.model('broadcastingLogs', broadcastingSchema);

module.exports = broadcasting;
