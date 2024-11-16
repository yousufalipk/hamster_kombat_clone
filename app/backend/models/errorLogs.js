const mongoose = require('mongoose');

// Define the error schema
const errorSchema = new mongoose.Schema({
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
