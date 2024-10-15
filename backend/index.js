const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_APP_PATH } = require('./config/env');
const connectToDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectToDb();

app.use(express.json());

const corsOptions = {
    origin: FRONTEND_APP_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
