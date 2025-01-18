const UserModel = require('../models/userSchema');
const TelegramUser = require('../models/telegramUsersSchema');
const RefreshTokenModel = require("../models/tokenSchema");

const axios = require('axios');

const ProjectModel = require('../models/projectSchema');
const KolsModel = require('../models/kolsSchema');
const PatnersModel = require('../models/patnersSchema');
const VcModel = require('../models/vcSchema');

const bcrypt = require('bcrypt');
const JWTService = require('../Services/JWTService');
const refreshToken = require('../models/tokenSchema');

const { BOT_TOKEN } = require('../config/env');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(BOT_TOKEN);


exports.createUser = async (req, res) => {
    try {
        const { fname, lname, email, password, confirmPassword, tick } = req.body;

        const alreadyUser = await UserModel.findOne({ email: email });

        if (alreadyUser) {
            return res.status(200).json({
                status: 'failed',
                message: "Account Already Created!"
            })
        }

        if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'failed',
                message: "Password did't match!"
            })
        }

        // Hashing Password before saving
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword,
            userType: 'user'
        })

        if (tick) {
            // Token Generation 
            let accessToken, refreshToken;

            accessToken = JWTService.signAccessToken({ _id: newUser._id, email: newUser.email }, '30m');
            refreshToken = JWTService.signRefreshToken({ _id: newUser._id }, '60m');

            const newRefreshToken = new RefreshTokenModel({
                token: refreshToken,
                userId: newUser._id
            })

            //Save Refresh Token
            await newRefreshToken.save();
        }

        //Save User
        await newUser.save();

        if (tick) {
            console.log("tick was true");
            return res.status(200).json({
                status: 'success',
                user: newUser,
                auth: true,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            return res.status(200).json({
                status: 'success',
                user: newUser,
                auth: true
            });
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid Password'
            });
        }

        let accessToken = JWTService.signAccessToken({ _id: user._id, email: user.email }, '30m');
        let refreshToken = JWTService.signRefreshToken({ _id: user._id }, '60m');

        await RefreshTokenModel.updateOne(
            { userId: user._id },
            { $set: { token: refreshToken } },
            { upsert: true }
        );

        return res.status(200).json({
            status: 'success',
            user: user,
            auth: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.logOutUser = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(200).json({
                status: 'failed',
                message: 'Refresh Token not found!'
            })
        }

        const deleteRefreshToken = await RefreshTokenModel.deleteOne({ token: refreshToken });

        if (!deleteRefreshToken) {
            return res.status(200).json({
                status: 'failed',
                message: 'Error Logging Out!'
            })
        }

        // Response
        return res.status(200).json({
            status: 'success',
            user: null,
            auth: false
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
}

exports.refresh = async (req, res) => {
    const { originalRefreshToken } = req.body;

    if (!originalRefreshToken) {
        return res.status(200).json({
            status: 'failed',
            message: 'Refresh token is missing',
            auth: false
        });
    }

    let id;
    try {
        const decoded = JWTService.verifyRefreshToken(originalRefreshToken);
        id = decoded._id;
    } catch (e) {
        console.error('Token verification failed:', e.message);
        return res.status(200).json({
            status: 'failed',
            message: 'Token verification failed'
        });
    }

    try {
        const match = await RefreshTokenModel.findOne({ userId: id, token: originalRefreshToken });
        if (!match) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized'
            });
        }

        const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
        const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

        await JWTService.storeRefreshToken(refreshToken, id);

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            user: user,
            auth: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
}

exports.fetchTwoTrueCards = async (req, res) => {
    try {
        const [projects, kols, partners, vcs] = await Promise.all([
            ProjectModel.find({ card: true }, { name: 1, card: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean(),
            KolsModel.find({ card: true }, { name: 1, card: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean(),
            PatnersModel.find({ card: true }, { name: 1, card: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean(),
            VcModel.find({ card: true }, { name: 1, card: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean(),
        ]);

        const allTrueCards = [
            ...projects.map(doc => ({ ...doc, type: 'project' })),
            ...kols.map(doc => ({ ...doc, type: 'kol' })),
            ...partners.map(doc => ({ ...doc, type: 'partner' })),
            ...vcs.map(doc => ({ ...doc, type: 'vc' })),
        ];

        const twoTrueCards = allTrueCards.slice(0, 2);

        return res.status(200).json({
            status: 'success',
            data: twoTrueCards,
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return res.status(500).json({
            status: 'failed',
            message: error.message || 'Internal Server Error',
        });
    }
};

exports.broadcastMessageToUsers = async (req, res) => {
    try {
        const { message, imageUrl, btnData } = req.body;

        if (!message || !btnData || !Array.isArray(btnData) || btnData.length === 0) {
            return res.status(400).json({
                error: 'Message, image URL, and at least one button are required.'
            });
        }

        const inlineKeyboard = btnData.map(btn => {
            if (!btn.buttonText || !btn.link) {
                throw new Error('Each button must have "buttonText" and "link".');
            }
            return [{ text: btn.buttonText, url: btn.link }];
        });

        const users = await TelegramUser.find({}, 'telegramId');
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        console.log(`Found ${users.length} users to broadcast the message.`);

        const failedUsers = [];
        const sendPromises = users.map(async (user) => {
            try {
                if (imageUrl) {
                    await bot.telegram.sendPhoto(user.telegramId, imageUrl, {
                        caption: message,
                        reply_markup: { inline_keyboard: inlineKeyboard }
                    });
                } else {
                    await bot.telegram.sendMessage(user.telegramId, message, {
                        reply_markup: { inline_keyboard: inlineKeyboard }
                    });
                }
            } catch (err) {
                console.error(`Failed to send message to user ${user.telegramId}:`, err.message);
                failedUsers.push(user.telegramId);
            }
        });

        await Promise.all(sendPromises);

        const successCount = users.length - failedUsers.length;

        res.status(200).json({
            status: 'success',
            message: `Broadcast completed. ${successCount} messages sent successfully.`,
            failedUsers
        });
    } catch (error) {
        console.error('Error broadcasting message:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
