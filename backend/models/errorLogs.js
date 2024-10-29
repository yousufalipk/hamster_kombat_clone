const mongoose = require('mongoose');

// Define the error schema
const errorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    error: {
        type: {
            type: Object,
            required: true
        }
    }
}, { timestamps: true });

// Create the model
const ErrorModel = mongoose.model('ErrorLogs', errorSchema);

module.exports = ErrorModel;
