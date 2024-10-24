const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectToDb = require('./config/db');
const { PORT, FRONTEND_APP_PATH } = require('./config/env');
const UserModel = require('./models/userModel');

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: FRONTEND_APP_PATH,
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));

const io = new Server(server, {
    cors: {
        origin: FRONTEND_APP_PATH,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

connectToDb();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize user
app.post('/fetch-user', async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username } = req.body;

        let isUser = await UserModel.findOne({ telegramId });

        if (!isUser) {
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
            isUser = await isUser.save();
        }

        return res.status(200).json({
            status: 'success',
            message: 'User initialized successfully!',
            user: isUser
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
});

io.on('connection', (socket) => {
    console.log("A new user has connected!", socket.id);

    // Update Balance
    socket.on('updateBalance', async (data) => {
        console.log("User ID", data.userId, "Tap Balance", data.tapBalance);
        const isUser = await UserModel.findById(data.userId);
        if (!isUser) {
            console.log("User not found!");
        } else {
            isUser.balance += data.tapBalance;
            await isUser.save();
        }
    });

});
