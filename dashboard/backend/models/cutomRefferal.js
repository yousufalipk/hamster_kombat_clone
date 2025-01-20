const mongoose = require('mongoose');

const customRefferal = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    refferalId: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }]
}, {
    timestamps: true,
});

const refferal = mongoose.model('customRefferal', customRefferal, 'customRefferal');

module.exports = refferal;