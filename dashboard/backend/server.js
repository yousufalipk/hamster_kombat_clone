const express = require('express');
const { PORT, FRONTEND_ORIGIN } = require('./config/env');
const ConnectToDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const patnerRoutes = require('./routes/patnerRoutes');
const kolsRoutes = require('./routes/kolsRoutes');
const vcRoutes = require('./routes/vsRoutes');

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(
    cors({
        origin: function (origin, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

ConnectToDB();

app.get('/', (req, res) => {
    return res.json('Server Running...');
});

app.use('/', userRoutes);
app.use('/project', projectRoutes);
app.use('/patners', patnerRoutes);
app.use('/kols', kolsRoutes);
app.use('/vcs', vcRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
