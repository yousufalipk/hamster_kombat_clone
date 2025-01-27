const UserModel = require('../models/userModel');
const TransactionModel = require('../models/transactions');

// Temp here move to env
const staticWalletAddress = 'TON_WALLET_ADDRESS';
const REWARD_TON_RATE = 1000;


// Connect User Wallet 
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

exports.checkTonTransaction = async (req, res) => {
    const { userId, tonValue, transactionHash } = req.body;

    if (!tonValue || isNaN(tonValue)) {
        return res.status(200).json({
            status: 'failed',
            message: 'Please enter a valid numeric value for TON.'
        });
    }

    const tonAmountInNanoCoins = tonValue * 1e9;

    const transaction = new TransactionModel({
        userId,
        tonAmount: tonAmountInNanoCoins,
        validUntil: Date.now() + 5 * 60 * 1000,
        transactionHash,
    });

    try {
        await transaction.save();

        const transactionStatus = await checkTransactionStatus(transactionHash);

        if (transactionStatus === 'successful') {
            transaction.status = 'successful';
            await transaction.save();

            let user = await UserModel.findById(userId);

            if (!user) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'User not found!'
                })
            }

            user.balance = tonValue * REWARD_TON_RATE;
            await user.save();

            res.status(200).json({
                status: 'success',
                message: 'Transaction successful and PTAP coins awarded.',
                newBalance: user.balance
            });
        } else {
            transaction.status = 'failed';
            await transaction.save();
            res.status(500).json({
                status: 'failed',
                message: 'Transaction failed.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        });
    }
}


