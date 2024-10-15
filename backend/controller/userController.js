const UserModel = require('../models/userModel.js');


exports.fetchUser = async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username } = req.body;

        let isUser = await UserModel.findOne({ telegramId: telegramId });

        if (!isUser) {
            // Create new account
            const newUser = new UserModel({
                telegramId: telegramId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                pic: null,
                level: 'silver',
                currentRank: '0',
                balance: 0
            })
            isUser = await newUser.save();
        }
        return res.status(200).json({
            status: 'success',
            message: 'User Initilized Succesfuly!',
            user: isUser
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.updateBalance = async (req, res) => {
    try {
        const { tapBalance, userId } = req.body;

        const isUser = await UserModel.findById(userId);

        if (!isUser) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        isUser.balance = isUser.balance + tapBalance;

        await isUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'Balance updated succesfuly!'
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
};