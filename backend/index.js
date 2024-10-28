const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectToDb = require('./config/db');
const { PORT, FRONTEND_APP_PATH_ONE, FRONTEND_APP_PATH_TWO } = require('./config/env');
const UserModel = require('./models/userModel');

const user = require('./Routes/userRoute');

console.log("Frontend path 1", FRONTEND_APP_PATH_ONE);
console.log("Frontend path 2", FRONTEND_APP_PATH_TWO);

const app = express();
const server = http.createServer(app);


// Apply CORS to Express
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
});


// Connect to the database
connectToDb();

// Middlewares
app.use(express.json());

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
