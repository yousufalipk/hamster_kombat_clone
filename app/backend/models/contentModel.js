const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    link: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ContentModel = mongoose.model('contents', contentSchema);

module.exports = ContentModel;