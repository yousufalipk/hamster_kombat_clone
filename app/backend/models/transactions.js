const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tonAmount: {
            type: Number,
            required: true,
        },
        transactionHash: {
            type: String,
            required: true,
            unique: true,
        },
        validUntil: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'successful', 'failed'],
            default: 'pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

transactionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
