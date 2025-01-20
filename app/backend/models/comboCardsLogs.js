const mongoose = require('mongoose');

const comboLogsSchema = new mongoose.Schema({
    comboCard1: {
        name: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
        },
    },
    comboCard2: {
        name: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
        },
    },
    formatedDateAndTime: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
});

const comboLogs = mongoose.model('comboCardsLogs', comboLogsSchema);

module.exports = comboLogs;
