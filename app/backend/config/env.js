const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

module.exports = {
    PORT,
    MONGO_DB_URI,
    TELEGRAM_BOT_TOKEN,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}