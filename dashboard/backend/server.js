const express = require('express')
const { PORT, FRONTEND_ORIGIN } = require('./config/env');
const ConnectToDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: function (FRONTEND_ORIGIN, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(express.json());

ConnectToDB();

// test route
app.get('/', (req, res) => {
    return res.json('Server Running...')
})

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})