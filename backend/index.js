const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectToDb = require('./config/db');
const { PORT, FRONTEND_APP_PATH } = require('./config/env');
const UserModel = require('./models/userModel');

const app = express();
const server = http.createServer(app);

// CORS Configuration
const corsOptions = {
    origin: FRONTEND_APP_PATH,
    methods: ['GET', 'POST'],
    credentials: true
};

// Apply CORS to Express
app.use(cors(corsOptions));

// Setup Socket.io with CORS
const io = new Server(server, {
    cors: {
        origin: FRONTEND_APP_PATH,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Connect to the database
connectToDb();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Health check endpoint
app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});

// User Initialization
app.post('/fetch-user', async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username } = req.body;

        // Check if user exists by telegramId
        let isUser = await UserModel.findOne({ telegramId });

        if (!isUser) {
            // If the user doesn't exist, create a new one
            isUser = new UserModel({
                telegramId,
                firstName,
                lastName,
                username,
                pic: null,
                level: 'silver',
                currentRank: '0',
                balance: 0
            });
            isUser = await isUser.save(); // Save user to the database
        }

        return res.status(200).json({
            status: 'success',
            message: 'User initialized successfully!',
            user: isUser
        });

    } catch (error) {
        console.error("Error during user initialization:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log("A new user has connected!", socket.id);

    // Update Balance
    socket.on('updateBalance', async (data) => {
        try {
            console.log("User ID", data.userId, "Tap Balance", data.tapBalance);

            const isUser = await UserModel.findById(data.userId);
            if (!isUser) {
                console.log("User not found!");
                socket.emit('error', { message: 'User not found!' });
            } else {
                // Update the user's balance
                isUser.balance += data.tapBalance;
                await isUser.save();
                console.log("User balance updated successfully!");
            }
        } catch (error) {
            console.error("Error updating balance:", error);
            socket.emit('error', { message: 'Failed to update balance' });
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
