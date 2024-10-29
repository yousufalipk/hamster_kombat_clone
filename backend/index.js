const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectToDb = require('./config/db');
const { PORT } = require('./config/env');
const UserModel = require('./models/userModel');

const user = require('./Routes/userRoute');

const app = express();

const server = http.createServer(app);


// Apply CORS to Express
app.use(cors({
    origin: '*',
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


app.post('/update-balance', async (req, res) => {
    try {
        const { userId, tapBalance } = req.body;

        const isUser = await UserModel.findById(userId);

        if (!isUser) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        isUser.balance += tapBalance;

        await isUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'Balance updated succesfuly!'
        })

    } catch (error) {
        console.log("Error Updating Balance!");
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
})

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

// Start Server   ---- server.listen incase of websockets
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Routers
app.use('/user', user);


// Test Routes
app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});
