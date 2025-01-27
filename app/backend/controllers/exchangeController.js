const UserModel = require('../models/userModel');

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

