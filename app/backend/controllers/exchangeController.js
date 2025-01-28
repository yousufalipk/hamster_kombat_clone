const UserModel = require('../models/userModel');
const TransactionModel = require('../models/transactions');
const InvoiceModel = require('../models/invoiceSchema.js');

const { TELEGRAM_BOT_TOKEN } = require('../config/env');
const { Bot } = require("grammy");

const bot = new Bot(TELEGRAM_BOT_TOKEN);

/* 
exports.connectWallet = async (req, res) => {
    try {
        const { userId, walletAddress } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        user.walletAddress = walletAddress;

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Wallet Connected Successfuly!',
            walletAddress: walletAddress
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

// Disconnect User Wallet
exports.disconnectWallet = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        user.walletAddress = null;

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Wallet disconnected successfuly!'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}
*/


// Update wallet address
exports.updateWalletAddress = async (req, res) => {
    try {
        const { userId, walletAddress } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (walletAddress) {
            user.walletAddress = walletAddress;
        } else {
            user.walletAddress = null;
        }

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Wallet address updated succesfully!'
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

// initiate Transaction
exports.initiateTransaction = async (req, res) => {
    try {
        const { userId, amount, nanoValue } = req.body;

        if (!userId || !amount || !nanoValue) {
            return res.status(200).json({
                status: 'failed',
                message: 'Missing required fields'
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'Internal Server Error!'
            })
        }

        const transaction = new TransactionModel({
            userId,
            amount,
            nanoValue,
            status: 'pending',
        });

        await transaction.save();

        res.status(200).json({
            status: 'success',
            message: 'Transaction initiated successfully',
            transactionId: transaction._id,
        });
    } catch (error) {
        console.error('Error initiating transaction:', error);
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
    try {
        const { transactionId, status, pTapGiven } = req.body;

        if (!transactionId || !status) {
            return res.status(200).json({
                status: 'failed',
                message: 'Missing required fields'
            });
        }

        if (!['success', 'failed'].includes(status)) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid Status value'
            });
        }

        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) {
            return res.status(200).json({
                status: 'failed',
                message: 'Transaction not found!'
            });
        }

        transaction.status = status;
        transaction.updatedAt = new Date();

        if (status === 'success') {
            transaction.pTapGiven = pTapGiven || 0;

            const user = await UserModel.findById(transaction.userId);

            if (user) {
                user.balance += pTapGiven;
                await user.save();
                await transaction.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'Transaction status updated successfully',
                    transaction,
                    newBalance: user.balance
                });
            }
        }
        return res.status(200).json({
            status: 'failed',
            message: 'Transaction status updated successfully',
            transaction
        });
    } catch (error) {
        console.error('Error updating transaction status:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

// Generate Stars Invoice Link 
exports.generateInvoiceLink = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            });
        }

        const title = "Panda Tap";
        const description = "Buy ptap using telegram stars!";
        const payload = "{}";
        const currency = "XTR";
        const prices = [{ amount: amount, label: "Ptap Coins" }];

        const invoiceLink = await bot.api.createInvoiceLink(
            title,
            description,
            payload,
            "",
            currency,
            prices
        );

        const newInvoice = new InvoiceModel({
            userId,
            amount,
            status: 'pending',
            invoiceLink,
            pTapGiven: 0
        });

        const savedInvoice = await newInvoice.save();

        return res.status(200).json({
            status: 'success',
            message: 'Invoice Link generated successfully!',
            invoiceId: savedInvoice._id,
            invoiceLink: invoiceLink
        });

    } catch (error) {
        console.error('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.updateInvoiceStatus = async (req, res) => {
    try {
        const { userId, invoiceId, pTapGiven, status } = req.body;

        const invoice = await InvoiceModel.findById(invoiceId);

        if (!invoice) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invoice not found!'
            });
        }


        if (status === 'success') {
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'User not found!'
                });
            }
            user.balance += pTapGiven;
            invoice.status = 'success';
            invoice.pTapGiven = pTapGiven;
        } else {
            invoice.status = 'failed';
        }

        await invoice.save();
        await user.save();

        if (invoice.status === 'success') {
            return res.status(200).json({
                status: 'success',
                message: 'Transaction successfull',
                newBalance: user.balance
            })
        } else {
            return res.status(200).json({
                status: 'failed',
                message: 'Transaction failed!',
            })
        }
    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}


