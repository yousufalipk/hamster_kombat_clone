const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_APP_PATH } = require('./config/env');
const connectToDb = require('./config/db');
const user = require('./routes/userRoutes');

const app = express();

connectToDb();

app.use(express.json());

// CORS configuration
app.use(cors({
    origin: FRONTEND_APP_PATH,
    credentials: true
}));

app.get('/', (req, res) => {
    return res.json({ message: `Backend is running correctly! PORT: ${PORT}` });
});

app.listen(PORT || 8080, () => {
    console.log(`Backend is running on port: ${PORT || 8080}`);
});


app.use('/user', user);
