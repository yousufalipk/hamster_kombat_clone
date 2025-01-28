const UserModel = require('../models/userModel');
const TransactionModel = require('../models/transactions');
const TonWeb = require('tonweb');

// Temp here move to env
const REWARD_TON_RATE = 1000;


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


