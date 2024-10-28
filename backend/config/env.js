const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const NGROK_ORIGIN = process.env.NGROK_ORIGIN;
const LOCAL_FRONTEND_ORIGIN = process.env.LOCAL_FRONTEND_ORIGIN;

module.exports = {
    PORT,
    MONGO_DB_URI,
    NGROK_ORIGIN,
    LOCAL_FRONTEND_ORIGIN
}