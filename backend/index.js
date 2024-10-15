const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_APP_PATH } = require('./config/env');
const connectToDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to the database
connectToDb();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: FRONTEND_APP_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Define a root route for testing
app.get('/', (req, res) => {
    res.send("Panda Tap backend is running correctly!");
});

// User routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
