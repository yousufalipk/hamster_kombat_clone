const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        required: true
    },
    pic: {
        type: String,
        default: null,
    },
    level: {
        type: String,
        default: 'silver',
    },
    currentRank: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;