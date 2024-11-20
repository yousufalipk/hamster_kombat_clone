const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToDb = require('./config/db');
const { PORT } = require('./config/env');
const UserModel = require('./models/userModel');
const { initializeIo, userSocketMap } = require('./utils/socketHelper');
const user = require('./Routes/userRoute');

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
                    isUser.level = res.data.newLevel;
                    isUser.currentRank = res.data.newRank;

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
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routers
app.use('/user', user);

// Test Routes
app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});
