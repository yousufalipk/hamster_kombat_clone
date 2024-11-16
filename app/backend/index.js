const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToDb = require('./config/db');
const { PORT } = require('./config/env');
const UserModel = require('./models/userModel');
const { initializeIo, userSocketMap } = require('./utils/socketHelper');
const user = require('./Routes/userRoute');

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
        console.log("Telegram id", telegramId);
        userSocketMap.set(telegramId, socket.id);
        console.log(`User ${telegramId} registered with socket ID ${socket.id}`);
        console.log("UserSocketMap", userSocketMap);
    });

    // Update Balance
    socket.on('updateBalance', async (data) => {
        try {
            console.log("User ID", data.userId, "Tap Balance", data.tapBalance);
            const isUser = await UserModel.findById(data.userId);

            if (!isUser) {
                console.log("User not found!");
                socket.emit('error', { message: 'User not found!' });
            } else {
                isUser.balance += data.tapBalance;
                await isUser.save();
                console.log("User balance updated successfully!");
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
