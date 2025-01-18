const mongoose = require('mongoose');

const comboLogsSchema = new mongoose.Schema({
    comboCard1: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    comboCard2: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true,
});

const comboLogs = mongoose.model('comboCardsLogs', comboLogsSchema);

module.exports = comboLogs;