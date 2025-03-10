const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToDb = require('./config/db');
const { PORT } = require('./config/env');
const UserModel = require('./models/userModel');
const { initializeIo, userSocketMap } = require('./utils/socketHelper');
const user = require('./Routes/userRoute');
const exchange = require('./Routes/exhangeRoutes');
const path = require('path');


const {
    checkLevelUpgrade
} = require('./utils/updateLevel');

const app = express();


const server = http.createServer(app);

// Apply CORS to Express
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Initialize io using helper
const io = initializeIo(server);

// Connect to the database
connectToDb();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io Connection
io.on('connection', (socket) => {
    console.log("A new user has connected!", socket.id);

    socket.on('register', (telegramId) => {
        userSocketMap.set(telegramId, socket.id);
    });

    // Update Balance
    socket.on('updateBalance', async (data) => {
        try {
            const isUser = await UserModel.findById(data.userId);

            if (!isUser) {
                socket.emit('error', { message: 'User not found!' });
            } else {
                isUser.balance += data.tapBalance;
                const res = await checkLevelUpgrade(isUser.balance, isUser.level, isUser.currentRank);

                if (res.success) {
                    isUser.level = res.data.currentLevel;

                }
                await isUser.save();
                socket.emit('levelup', isUser);
            }
        } catch (error) {
            console.error("Error updating balance:", error);
            socket.emit('error', { message: 'Failed to update balance' });
        }
    });

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);

        for (let [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
            }
        }
    });
});

// Start Server
server.listen(PORT || 8080, () => {
    console.log(`Server is running on port ${PORT || 8080}`);
});

// Routers
app.use('/user', user);
app.use('/exchange', exchange);

// Test Routes
app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});

app.get('/reset-users-combo-cards', async (req, res) => {
    const batchSize = 1000;
    let skip = 0;

    try {
        while (true) {
            const users = await UserModel.find({})
                .skip(skip)
                .limit(batchSize);

            if (users.length === 0) break;

            const bulkOps = users.map(user => {
                const update = { $set: { comboCards: [] } };

                if (user.comboCards.length === 2) {
                    update.$inc = { balance: 50000 };
                }

                return {
                    updateOne: {
                        filter: { _id: user._id },
                        update: update
                    }
                };
            });

            if (bulkOps.length > 0) {
                await UserModel.bulkWrite(bulkOps);
            }

            skip += batchSize;
            console.log(`Processed ${skip} users...`);
        }

        res.send('User balance update completed successfully.');
    } catch (error) {
        console.error('Error during user balance update:', error);
        res.status(500).send('Error during user balance update.');
    }
});


app.get('/api/utc-time', (req, res) => {
    try {
        const currentUTCTime = new Date().toISOString();

        res.status(200).json({
            success: true,
            utcTime: currentUTCTime
        });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
});

app.get('/user-with-profile-pic', async (req, res) => {
    try {
        const stats = await UserModel.aggregate([
            {
                $group: {
                    _id: {
                        hasProfilePic: {
                            $cond: {
                                if: { $and: [{ $ne: ["$profilePic", null] }, { $ne: ["$profilePic", "not set"] }] },
                                then: true,
                                else: false
                            }
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    hasProfilePic: "$_id.hasProfilePic",
                    count: 1
                }
            }
        ]);

        const withProfilePic = stats.find(stat => stat.hasProfilePic === true)?.count || 0;
        const withoutProfilePic = stats.find(stat => stat.hasProfilePic === false)?.count || 0;
        const totalUsers = withProfilePic + withoutProfilePic;

        const result = {
            withProfilePic,
            withoutProfilePic,
            totalUsers
        };

        res.status(200).json({
            status: 'success',
            result: result
        });
    } catch (error) {
        console.log('Internal Server Error!');
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
})
